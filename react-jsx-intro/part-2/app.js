function App() {
    return (
      <div>
        <Tweet
          name="User 1"
          username="user1"
          date={1/1/11}
          message="First Message"
        />
        <Tweet
          name="User 2"
          username="user2"
          date={1/2/11}
          message="Second Message"
        />
        <Tweet
          name="User 3"
          username="user3"
          date={1/3/11}
          message="Third Message"
        />
      </div>
    );
  }

  ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
  