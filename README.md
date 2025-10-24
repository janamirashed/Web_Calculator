# 🧮 Web-Based Calculator

A full-stack web calculator application with a Spring Boot backend and AngularJS frontend, inspired by the Windows Calculator interface.

[![Java](https://img.shields.io/badge/Java-17+-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![AngularJS](https://img.shields.io/badge/AngularJS-1.8.2-red.svg)](https://angularjs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ✨ Features

### Basic Operations
- ✅ Addition, Subtraction, Multiplication, Division
- ✅ Decimal number support
- ✅ Negative number handling

### Advanced Operations
- ✅ Square (x²)
- ✅ Square Root (²√x)
- ✅ Reciprocal (⅟x)
- ✅ Percentage (%)
- ✅ Sign toggle (+/−)

### User Interface
- ✅ Responsive button-based interface
- ✅ Real-time display updates
- ✅ Backspace functionality
- ✅ Clear (C/CE) operations
- ✅ Error handling with "E" display

### Backend Features
- ✅ Expression evaluation using stack-based algorithm
- ✅ Operator precedence handling
- ✅ Division by zero protection
- ✅ RESTful API architecture
- ✅ CORS enabled for cross-origin requests

## 🛠 Technology Stack

### Frontend
- **AngularJS** 1.8.2 - JavaScript framework
- **HTML5** - Structure
- **CSS3** - Styling with custom design
- **HTTP Client** - For API communication

### Backend
- **Java** 17+
- **Spring Boot** 3.x - Application framework
- **Spring Web** - REST API
- **Maven** - Dependency management

### Architecture
- **RESTful API** - Client-server communication
- **MVC Pattern** - Model-View-Controller
- **Service Layer** - Business logic separation

## 🏗 Architecture

```
┌─────────────────┐
│   Browser UI    │
│   (AngularJS)   │
└────────┬────────┘
         │ HTTP POST
         │ /api/calculate
         ▼
┌─────────────────┐
│  REST Controller│
│  (Spring Boot)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Calculator Svc  │
│ (Expression     │
│  Evaluator)     │
└─────────────────┘
```

**Data Flow:**
1. User interacts with calculator buttons
2. Frontend builds mathematical expression
3. Expression sent via HTTP POST to backend
4. Backend evaluates using stack-based algorithm
5. Result returned as string
6. Frontend displays result


## 📁 Project Structure

```
Calculator_Backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/calculator_backend/
│   │   │       ├── CalculatorBackendApplication.java
│   │   │       ├── controller/
│   │   │       │   └── CalculatorController.java
│   │   │       ├── service/
│   │   │       │   └── CalculatorService.java
│   │   │       └── model/
│   │   │           └── CalculationRequest.java
│   │   └── resources/
│   │       ├── static/
│   │       │   ├── index.html
│   │       │   ├── css/
│   │       │   │   └── style.css
│   │       │   └── js/
│   │       │       └── app.js
│   │       └── application.properties
│   └── test/
│       └── java/
├── pom.xml
└── README.md
```

## 🎯 Future Enhancements

- [ ] Add keyboard support
- [ ] Implement scientific calculator mode
- [ ] Add calculation history
- [ ] Support for parentheses in UI
- [ ] Memory functions (M+, M-, MR, MC)
- [ ] Theme customization
- [ ] Responsive design for mobile
- [ ] Unit tests for backend service
- [ ] Integration tests for REST API
- [ ] Frontend unit tests with Jasmine/Karma
