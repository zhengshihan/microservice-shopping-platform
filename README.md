# Online Shopping Platform

## Overview
This is a microservices-based online shopping application designed to manage product listings, inventory, order processing, and customer notifications. The application leverages modern technologies to provide a scalable and maintainable solution for online shopping.

## Features
- **Product Show Page**: Users can view and browse a variety of products.
- **Inventory Management**: Manage product availability and stock levels.
- **Order Processing**: Complete order management, including order creation and tracking.
- **Notification Functionality**: Keep users updated with relevant notifications.
- **Personalized Recommendations**: Integrated chatbot for personalized event recommendations using Gemini AI.

## Technology Stack
- **Frontend**: React, TypeScript
- **Backend**: Spring Boot, Spring Cloud
- **Messaging**: Kafka
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Service Discovery**: Eureka
- **Authentication**: Keycloak

## Getting Started

### Prerequisites
Make sure you have the following installed:
- Docker
- Kubernetes
- Java (JDK 11 or higher)
- Node.js (for React frontend)
- Kafka

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/online-shopping-platform.git
   cd online-shopping-platform
   ```

2. **Setup Backend:**
   - Navigate to the backend directory and build the application.
   ```bash
   cd backend
   ./mvnw clean install
   ```

3. **Run Kafka and Zookeeper:**
   - Use Docker to run Kafka and Zookeeper.
   ```bash
   docker-compose up -d
   ```

4. **Deploy with Kubernetes:**
   - Ensure your Kubernetes cluster is up and running, then deploy the application.
   ```bash
   kubectl apply -f k8s/
   ```

5. **Setup Frontend:**
   - Navigate to the frontend directory and install dependencies.
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start the Frontend:**
   ```bash
   npm start
   ```

### Configuration

- Configure the `application.yaml` files in the backend to set up your database and other configurations.
- Set up Keycloak for authentication and adjust your settings accordingly.

## Usage
- Access the application through your web browser at `http://localhost:3000` (assuming the frontend is running locally).



