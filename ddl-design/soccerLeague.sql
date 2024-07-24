-- Teams Table
CREATE TABLE Teams (
    TeamID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

-- Players Table
CREATE TABLE Players (
    PlayerID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

-- TeamPlayers Table
CREATE TABLE TeamPlayers (
    TeamPlayerID INT PRIMARY KEY,
    TeamID INT,
    PlayerID INT,
    SeasonID INT,
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID),
    FOREIGN KEY (SeasonID) REFERENCES Seasons(SeasonID)
);

-- Referees Table
CREATE TABLE Referees (
    RefereeID INT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL
);

-- Matches Table
CREATE TABLE Matches (
    MatchID INT PRIMARY KEY,
    HomeTeamID INT,
    AwayTeamID INT,
    Date DATETIME,
    SeasonID INT,
    FOREIGN KEY (HomeTeamID) REFERENCES Teams(TeamID),
    FOREIGN KEY (AwayTeamID) REFERENCES Teams(TeamID),
    FOREIGN KEY (SeasonID) REFERENCES Seasons(SeasonID)
);

-- MatchReferees Table
CREATE TABLE MatchReferees (
    MatchRefereeID INT PRIMARY KEY,
    MatchID INT,
    RefereeID INT,
    FOREIGN KEY (MatchID) REFERENCES Matches(MatchID),
    FOREIGN KEY (RefereeID) REFERENCES Referees(RefereeID)
);

-- Goals Table
CREATE TABLE Goals (
    GoalID INT PRIMARY KEY,
    MatchID INT,
    PlayerID INT,
    TimeScored DATETIME,
    FOREIGN KEY (MatchID) REFERENCES Matches(MatchID),
    FOREIGN KEY (PlayerID) REFERENCES Players(PlayerID)
);

-- Seasons Table
CREATE TABLE Seasons (
    SeasonID INT PRIMARY KEY,
    StartDate DATE,
    EndDate DATE
);

-- Standings Table
CREATE TABLE Standings (
    StandingsID INT PRIMARY KEY,
    SeasonID INT,
    TeamID INT,
    Points INT,
    FOREIGN KEY (SeasonID) REFERENCES Seasons(SeasonID),
    FOREIGN KEY (TeamID) REFERENCES Teams(TeamID)
);
