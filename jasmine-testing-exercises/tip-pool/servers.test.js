describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();
    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  
  it('should update the serverTable on updateServerTable()', function () {
    submitServerInfo();
    updateServerTable();
    let serverListTds=document.getElementById("serverTable").querySelectorAll("td");
    expect(serverListTds.length).toEqual(3);
    expect(serverListTds[0].innerText).toEqual("Alice");
    expect(serverListTds[1].innerText).toEqual("$0.00");
    
  });
  


  afterEach(function() {
    // teardown logic
    serverNameInput.value="";
    document.getElementById("serverTable").querySelector("tbody").deleteRow(0);
    allServers={};
  });
});
