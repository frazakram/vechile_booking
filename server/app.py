from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import os
import jwt
import uuid
from werkzeug.security import generate_password_hash, check_password_hash

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vehicle_service.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'

# Initialize database
db = SQLAlchemy(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    vehicles = db.relationship('Vehicle', backref='user', lazy=True)
    bookings = db.relationship('Booking', backref='user', lazy=True)

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    make = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer, nullable=False)
    license_plate = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class ServiceType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    price = db.Column(db.Float, nullable=False)

class ServiceCenter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100))

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), nullable=False)
    service_type_id = db.Column(db.Integer, db.ForeignKey('service_type.id'), nullable=False)
    service_center_id = db.Column(db.Integer, db.ForeignKey('service_center.id'), nullable=False)
    booking_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), default='Pending')
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    vehicle = db.relationship('Vehicle', backref='bookings')
    service_type = db.relationship('ServiceType', backref='bookings')
    service_center = db.relationship('ServiceCenter', backref='bookings')

# Helper functions
def token_required(f):
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user_id']).first()
        except:
            return jsonify({'message': 'Token is invalid!'}), 401
            
        return f(current_user, *args, **kwargs)
    
    decorated.__name__ = f.__name__
    return decorated

# Routes
@app.route('/api/users', methods=['POST'])
def register_user():
    data = request.get_json()
    
    # Check if user exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User already exists!'}), 400
    
    # Create new user
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(
        name=data['name'],
        email=data['email'],
        phone=data['phone'],
        password=hashed_password
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({
        'id': new_user.id,
        'name': new_user.name,
        'email': new_user.email,
        'phone': new_user.phone
    }), 201

@app.route('/api/users/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user:
        return jsonify({'message': 'User not found!'}), 404
    
    if check_password_hash(user.password, data['password']):
        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.utcnow().timestamp() + 86400  # 24 hours
        }, app.config['SECRET_KEY'], algorithm="HS256")
        
        return jsonify({
            'token': token,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email
            }
        }), 200
    
    return jsonify({'message': 'Invalid credentials!'}), 401

@app.route('/api/vehicles', methods=['GET'])
@token_required
def get_vehicles(current_user):
    vehicles = Vehicle.query.filter_by(user_id=current_user.id).all()
    
    output = []
    for vehicle in vehicles:
        output.append({
            'id': vehicle.id,
            'make': vehicle.make,
            'model': vehicle.model,
            'year': vehicle.year,
            'license_plate': vehicle.license_plate
        })
    
    return jsonify(output), 200

@app.route('/api/vehicles', methods=['POST'])
@token_required
def create_vehicle(current_user):
    data = request.get_json()
    
    new_vehicle = Vehicle(
        user_id=current_user.id,
        make=data['make'],
        model=data['model'],
        year=data['year'],
        license_plate=data['license_plate']
    )
    
    db.session.add(new_vehicle)
    db.session.commit()
    
    return jsonify({
        'id': new_vehicle.id,
        'make': new_vehicle.make,
        'model': new_vehicle.model,
        'year': new_vehicle.year,
        'license_plate': new_vehicle.license_plate
    }), 201

@app.route('/api/vehicles/<int:vehicle_id>', methods=['DELETE'])
@token_required
def delete_vehicle(current_user, vehicle_id):
    vehicle = Vehicle.query.filter_by(id=vehicle_id, user_id=current_user.id).first()
    
    if not vehicle:
        return jsonify({'message': 'Vehicle not found!'}), 404
    
    db.session.delete(vehicle)
    db.session.commit()
    
    return jsonify({'message': 'Vehicle deleted!'}), 200

@app.route('/api/services/types', methods=['GET'])
def get_service_types():
    service_types = ServiceType.query.all()
    
    output = []
    for service_type in service_types:
        output.append({
            'id': service_type.id,
            'name': service_type.name,
            'description': service_type.description,
            'price': service_type.price
        })
    
    return jsonify(output), 200

@app.route('/api/services/centers', methods=['GET'])
def get_service_centers():
    service_centers = ServiceCenter.query.all()
    
    output = []
    for center in service_centers:
        output.append({
            'id': center.id,
            'name': center.name,
            'address': center.address,
            'phone': center.phone,
            'email': center.email
        })
    
    return jsonify(output), 200

@app.route('/api/bookings', methods=['GET'])
@token_required
def get_bookings(current_user):
    bookings = Booking.query.filter_by(user_id=current_user.id).all()
    
    output = []
    for booking in bookings:
        output.append({
            'id': booking.id,
            'vehicle': {
                'id': booking.vehicle.id,
                'make': booking.vehicle.make,
                'model': booking.vehicle.model
            },
            'service_type': {
                'id': booking.service_type.id,
                'name': booking.service_type.name
            },
            'service_center': {
                'id': booking.service_center.id,
                'name': booking.service_center.name
            },
            'booking_date': booking.booking_date.strftime('%Y-%m-%d %H:%M'),
            'status': booking.status,
            'notes': booking.notes
        })
    
    return jsonify(output), 200

@app.route('/api/bookings', methods=['POST'])
@token_required
def create_booking(current_user):
    data = request.get_json()
    
    # Check if vehicle belongs to user
    vehicle = Vehicle.query.filter_by(id=data['vehicle_id'], user_id=current_user.id).first()
    if not vehicle:
        return jsonify({'message': 'Vehicle not found!'}), 404
    
    # Check if service type exists
    service_type = ServiceType.query.filter_by(id=data['service_type_id']).first()
    if not service_type:
        return jsonify({'message': 'Service type not found!'}), 404
    
    # Check if service center exists
    service_center = ServiceCenter.query.filter_by(id=data['service_center_id']).first()
    if not service_center:
        return jsonify({'message': 'Service center not found!'}), 404
    
    new_booking = Booking(
        user_id=current_user.id,
        vehicle_id=data['vehicle_id'],
        service_type_id=data['service_type_id'],
        service_center_id=data['service_center_id'],
        booking_date=datetime.strptime(data['booking_date'], '%Y-%m-%d %H:%M'),
        notes=data.get('notes', '')
    )
    
    db.session.add(new_booking)
    db.session.commit()
    
    return jsonify({
        'id': new_booking.id,
        'vehicle': {
            'id': vehicle.id,
            'make': vehicle.make,
            'model': vehicle.model
        },
        'service_type': {
            'id': service_type.id,
            'name': service_type.name
        },
        'service_center': {
            'id': service_center.id,
            'name': service_center.name
        },
        'booking_date': new_booking.booking_date.strftime('%Y-%m-%d %H:%M'),
        'status': new_booking.status,
        'notes': new_booking.notes
    }), 201

@app.route('/api/bookings/<int:booking_id>/cancel', methods=['PUT'])
@token_required
def cancel_booking(current_user, booking_id):
    booking = Booking.query.filter_by(id=booking_id, user_id=current_user.id).first()
    
    if not booking:
        return jsonify({'message': 'Booking not found!'}), 404
    
    booking.status = 'Cancelled'
    db.session.commit()
    
    return jsonify({
        'id': booking.id,
        'status': booking.status
    }), 200

# Initialize database with seed data
@app.before_first_request
def create_tables():
    db.create_all()
    
    # Add seed data if tables are empty
    if not ServiceType.query.first():
        service_types = [
            ServiceType(name='Oil Change', description='Change vehicle oil and filter', price=30.00),
            ServiceType(name='Tire Rotation', description='Rotate tires for even wear', price=20.00),
            ServiceType(name='Brake Service', description='Inspect and service brakes', price=100.00),
            ServiceType(name='Full Service', description='Complete vehicle maintenance', price=150.00)
        ]
        db.session.bulk_save_objects(service_types)
        db.session.commit()
    
    if not ServiceCenter.query.first():
        service_centers = [
            ServiceCenter(
                name='Main Service Center',
                address='123 Main St, City',
                phone='555-123-4567',
                email='service@example.com'
            )
        ]
        db.session.bulk_save_objects(service_centers)
        db.session.commit()

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
