describe("Servers test (with setup and tear-down)", function () {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  it('should update #serverTable on updateServerTable()', function () {
    submitServerInfo();
    updateServerTable();
    let curIdList = document.querySelectorAll('#serverTable tbody tr td');


    expect(curIdList, length(3));
    expect(curTdList[0].innerText).toEqual('Alice');
    expect(curTdList[1].innerText).toEqual('$0.00');
    expect(curTdList[2].innerText).toEqual('X');
  })

  afterEach(function () {
    // teardown logic
    serverId = 0;
    serverTbody = '';
    allServers = {};
  });
});
