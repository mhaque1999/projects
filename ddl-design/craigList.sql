CREATE TABLE Regions (
    RegionID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    PreferredRegionID INT,
    FOREIGN KEY (PreferredRegionID) REFERENCES Regions(RegionID)
);

CREATE TABLE Posts (
    PostID INT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Text TEXT NOT NULL,
    UserID INT,
    Location VARCHAR(255),
    RegionID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (RegionID) REFERENCES Regions(RegionID)
);

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);


CREATE TABLE PostCategories (
    PostCategoryID INT PRIMARY KEY,
    PostID INT,
    CategoryID INT,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);
