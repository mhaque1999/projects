function App() {
  return (
    <div>
      <FirstComponent/>
      <NamedComponent name="Maahin"/>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);