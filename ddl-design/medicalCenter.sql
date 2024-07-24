-- Doctors Table
CREATE TABLE Doctors (
    DoctorID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

-- Patients Table
CREATE TABLE Patients (
    PatientID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

-- DoctorPatients Table (Join table for Doctors and Patients)
CREATE TABLE DoctorPatients (
    DoctorPatientID INT PRIMARY KEY,
    DoctorID INT,
    PatientID INT,
    FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID),
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)
);

-- Diseases Table
CREATE TABLE Diseases (
    DiseaseID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

-- Visits Table
CREATE TABLE Visits (
    VisitID INT PRIMARY KEY,
    PatientID INT,
    VisitDate DATETIME,
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)
);

-- Diagnoses Table (Join table for Visits and Diseases)
CREATE TABLE Diagnoses (
    DiagnosisID INT PRIMARY KEY,
    VisitID INT,
    DiseaseID INT,
    FOREIGN KEY (VisitID) REFERENCES Visits(VisitID),
    FOREIGN KEY (DiseaseID) REFERENCES Diseases(DiseaseID)
);
