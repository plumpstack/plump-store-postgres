'use strict';

var _sql = require('../sql');

var _plump = require('plump');

var _pg = require('pg');

var pg = _interopRequireWildcard(_pg);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function runSQL(command) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var connOptions = Object.assign({}, {
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    charset: 'utf8'
  }, opts);
  var client = new pg.Client(connOptions);
  return new Promise(function (resolve) {
    client.connect(function (err) {
      if (err) throw err;
      client.query(command, function (err) {
        if (err) throw err;
        client.end(function (err) {
          if (err) throw err;
          resolve();
        });
      });
    });
  });
} /* eslint-env node, mocha*/
/* eslint no-shadow: 0 */

(0, _plump.testSuite)({
  describe: describe, it: it, before: before, after: after
}, {
  ctor: _sql.PGStore,
  opts: {
    sql: {
      connection: {
        database: 'plump_test',
        user: 'postgres',
        host: 'localhost',
        port: 5432
      }
    },
    terminal: true
  },
  name: 'Plump Postgres Store',
  before: function before() {
    return runSQL('DROP DATABASE if exists plump_test;').then(function () {
      return runSQL('CREATE DATABASE plump_test;');
    }).then(function () {
      return runSQL('\n        CREATE SEQUENCE testid_seq\n          START WITH 1\n          INCREMENT BY 1\n          NO MINVALUE\n          MAXVALUE 2147483647\n          CACHE 1\n          CYCLE;\n        CREATE TABLE tests (\n          id integer not null primary key DEFAULT nextval(\'testid_seq\'::regclass),\n          name text,\n          extended jsonb not null default \'{}\'::jsonb\n        );\n        CREATE TABLE parent_child_relationship (parent_id integer not null, child_id integer not null);\n        CREATE UNIQUE INDEX children_join on parent_child_relationship (parent_id, child_id);\n        CREATE TABLE reactions (parent_id integer not null, child_id integer not null, reaction text not null);\n        CREATE UNIQUE INDEX reactions_join on reactions (parent_id, child_id, reaction);\n        CREATE TABLE valence_children (parent_id integer not null, child_id integer not null, perm integer not null);\n        CREATE TABLE query_children (parent_id integer not null, child_id integer not null, perm integer not null);\n      ', { database: 'plump_test' });
    });
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Qvc3FsLnNwZWMuanMiXSwibmFtZXMiOlsicGciLCJydW5TUUwiLCJjb21tYW5kIiwib3B0cyIsImNvbm5PcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwidXNlciIsImhvc3QiLCJwb3J0IiwiZGF0YWJhc2UiLCJjaGFyc2V0IiwiY2xpZW50IiwiQ2xpZW50IiwiUHJvbWlzZSIsInJlc29sdmUiLCJjb25uZWN0IiwiZXJyIiwicXVlcnkiLCJlbmQiLCJkZXNjcmliZSIsIml0IiwiYmVmb3JlIiwiYWZ0ZXIiLCJjdG9yIiwic3FsIiwiY29ubmVjdGlvbiIsInRlcm1pbmFsIiwibmFtZSIsInRoZW4iXSwibWFwcGluZ3MiOiI7O0FBR0E7O0FBQ0E7O0FBQ0E7O0lBQVlBLEU7Ozs7QUFFWixTQUFTQyxNQUFULENBQWdCQyxPQUFoQixFQUFvQztBQUFBLE1BQVhDLElBQVcsdUVBQUosRUFBSTs7QUFDbEMsTUFBTUMsY0FBY0MsT0FBT0MsTUFBUCxDQUNsQixFQURrQixFQUVsQjtBQUNFQyxVQUFNLFVBRFI7QUFFRUMsVUFBTSxXQUZSO0FBR0VDLFVBQU0sSUFIUjtBQUlFQyxjQUFVLFVBSlo7QUFLRUMsYUFBUztBQUxYLEdBRmtCLEVBU2xCUixJQVRrQixDQUFwQjtBQVdBLE1BQU1TLFNBQVMsSUFBSVosR0FBR2EsTUFBUCxDQUFjVCxXQUFkLENBQWY7QUFDQSxTQUFPLElBQUlVLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQWE7QUFDOUJILFdBQU9JLE9BQVAsQ0FBZSxVQUFDQyxHQUFELEVBQVM7QUFDdEIsVUFBSUEsR0FBSixFQUFTLE1BQU1BLEdBQU47QUFDVEwsYUFBT00sS0FBUCxDQUFhaEIsT0FBYixFQUFzQixVQUFDZSxHQUFELEVBQVM7QUFDN0IsWUFBSUEsR0FBSixFQUFTLE1BQU1BLEdBQU47QUFDVEwsZUFBT08sR0FBUCxDQUFXLFVBQUNGLEdBQUQsRUFBUztBQUNsQixjQUFJQSxHQUFKLEVBQVMsTUFBTUEsR0FBTjtBQUNURjtBQUNELFNBSEQ7QUFJRCxPQU5EO0FBT0QsS0FURDtBQVVELEdBWE0sQ0FBUDtBQVlELEMsQ0FoQ0Q7QUFDQTs7QUFrQ0Esc0JBQVU7QUFDUkssb0JBRFEsRUFDRUMsTUFERixFQUNNQyxjQUROLEVBQ2NDO0FBRGQsQ0FBVixFQUVHO0FBQ0RDLG9CQURDO0FBRURyQixRQUFNO0FBQ0pzQixTQUFLO0FBQ0hDLGtCQUFZO0FBQ1ZoQixrQkFBVSxZQURBO0FBRVZILGNBQU0sVUFGSTtBQUdWQyxjQUFNLFdBSEk7QUFJVkMsY0FBTTtBQUpJO0FBRFQsS0FERDtBQVNKa0IsY0FBVTtBQVROLEdBRkw7QUFhREMsUUFBTSxzQkFiTDtBQWNETixVQUFRLGtCQUFNO0FBQ1osV0FBT3JCLE9BQU8scUNBQVAsRUFDTjRCLElBRE0sQ0FDRDtBQUFBLGFBQU01QixPQUFPLDZCQUFQLENBQU47QUFBQSxLQURDLEVBRU40QixJQUZNLENBRUQsWUFBTTtBQUNWLGFBQU81QixraENBbUJKLEVBQUVTLFVBQVUsWUFBWixFQW5CSSxDQUFQO0FBb0JELEtBdkJNLENBQVA7QUF3QkQ7QUF2Q0EsQ0FGSCIsImZpbGUiOiJ0ZXN0L3NxbC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWVudiBub2RlLCBtb2NoYSovXG4vKiBlc2xpbnQgbm8tc2hhZG93OiAwICovXG5cbmltcG9ydCB7IFBHU3RvcmUgfSBmcm9tICcuLi9zcWwnO1xuaW1wb3J0IHsgdGVzdFN1aXRlIH0gZnJvbSAncGx1bXAnO1xuaW1wb3J0ICogYXMgcGcgZnJvbSAncGcnO1xuXG5mdW5jdGlvbiBydW5TUUwoY29tbWFuZCwgb3B0cyA9IHt9KSB7XG4gIGNvbnN0IGNvbm5PcHRpb25zID0gT2JqZWN0LmFzc2lnbihcbiAgICB7fSxcbiAgICB7XG4gICAgICB1c2VyOiAncG9zdGdyZXMnLFxuICAgICAgaG9zdDogJ2xvY2FsaG9zdCcsXG4gICAgICBwb3J0OiA1NDMyLFxuICAgICAgZGF0YWJhc2U6ICdwb3N0Z3JlcycsXG4gICAgICBjaGFyc2V0OiAndXRmOCcsXG4gICAgfSxcbiAgICBvcHRzXG4gICk7XG4gIGNvbnN0IGNsaWVudCA9IG5ldyBwZy5DbGllbnQoY29ubk9wdGlvbnMpO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBjbGllbnQuY29ubmVjdCgoZXJyKSA9PiB7XG4gICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gICAgICBjbGllbnQucXVlcnkoY29tbWFuZCwgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB0aHJvdyBlcnI7XG4gICAgICAgIGNsaWVudC5lbmQoKGVycikgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHRocm93IGVycjtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5cbnRlc3RTdWl0ZSh7XG4gIGRlc2NyaWJlLCBpdCwgYmVmb3JlLCBhZnRlcixcbn0sIHtcbiAgY3RvcjogUEdTdG9yZSxcbiAgb3B0czoge1xuICAgIHNxbDoge1xuICAgICAgY29ubmVjdGlvbjoge1xuICAgICAgICBkYXRhYmFzZTogJ3BsdW1wX3Rlc3QnLFxuICAgICAgICB1c2VyOiAncG9zdGdyZXMnLFxuICAgICAgICBob3N0OiAnbG9jYWxob3N0JyxcbiAgICAgICAgcG9ydDogNTQzMixcbiAgICAgIH0sXG4gICAgfSxcbiAgICB0ZXJtaW5hbDogdHJ1ZSxcbiAgfSxcbiAgbmFtZTogJ1BsdW1wIFBvc3RncmVzIFN0b3JlJyxcbiAgYmVmb3JlOiAoKSA9PiB7XG4gICAgcmV0dXJuIHJ1blNRTCgnRFJPUCBEQVRBQkFTRSBpZiBleGlzdHMgcGx1bXBfdGVzdDsnKVxuICAgIC50aGVuKCgpID0+IHJ1blNRTCgnQ1JFQVRFIERBVEFCQVNFIHBsdW1wX3Rlc3Q7JykpXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHJ1blNRTChgXG4gICAgICAgIENSRUFURSBTRVFVRU5DRSB0ZXN0aWRfc2VxXG4gICAgICAgICAgU1RBUlQgV0lUSCAxXG4gICAgICAgICAgSU5DUkVNRU5UIEJZIDFcbiAgICAgICAgICBOTyBNSU5WQUxVRVxuICAgICAgICAgIE1BWFZBTFVFIDIxNDc0ODM2NDdcbiAgICAgICAgICBDQUNIRSAxXG4gICAgICAgICAgQ1lDTEU7XG4gICAgICAgIENSRUFURSBUQUJMRSB0ZXN0cyAoXG4gICAgICAgICAgaWQgaW50ZWdlciBub3QgbnVsbCBwcmltYXJ5IGtleSBERUZBVUxUIG5leHR2YWwoJ3Rlc3RpZF9zZXEnOjpyZWdjbGFzcyksXG4gICAgICAgICAgbmFtZSB0ZXh0LFxuICAgICAgICAgIGV4dGVuZGVkIGpzb25iIG5vdCBudWxsIGRlZmF1bHQgJ3t9Jzo6anNvbmJcbiAgICAgICAgKTtcbiAgICAgICAgQ1JFQVRFIFRBQkxFIHBhcmVudF9jaGlsZF9yZWxhdGlvbnNoaXAgKHBhcmVudF9pZCBpbnRlZ2VyIG5vdCBudWxsLCBjaGlsZF9pZCBpbnRlZ2VyIG5vdCBudWxsKTtcbiAgICAgICAgQ1JFQVRFIFVOSVFVRSBJTkRFWCBjaGlsZHJlbl9qb2luIG9uIHBhcmVudF9jaGlsZF9yZWxhdGlvbnNoaXAgKHBhcmVudF9pZCwgY2hpbGRfaWQpO1xuICAgICAgICBDUkVBVEUgVEFCTEUgcmVhY3Rpb25zIChwYXJlbnRfaWQgaW50ZWdlciBub3QgbnVsbCwgY2hpbGRfaWQgaW50ZWdlciBub3QgbnVsbCwgcmVhY3Rpb24gdGV4dCBub3QgbnVsbCk7XG4gICAgICAgIENSRUFURSBVTklRVUUgSU5ERVggcmVhY3Rpb25zX2pvaW4gb24gcmVhY3Rpb25zIChwYXJlbnRfaWQsIGNoaWxkX2lkLCByZWFjdGlvbik7XG4gICAgICAgIENSRUFURSBUQUJMRSB2YWxlbmNlX2NoaWxkcmVuIChwYXJlbnRfaWQgaW50ZWdlciBub3QgbnVsbCwgY2hpbGRfaWQgaW50ZWdlciBub3QgbnVsbCwgcGVybSBpbnRlZ2VyIG5vdCBudWxsKTtcbiAgICAgICAgQ1JFQVRFIFRBQkxFIHF1ZXJ5X2NoaWxkcmVuIChwYXJlbnRfaWQgaW50ZWdlciBub3QgbnVsbCwgY2hpbGRfaWQgaW50ZWdlciBub3QgbnVsbCwgcGVybSBpbnRlZ2VyIG5vdCBudWxsKTtcbiAgICAgIGAsIHsgZGF0YWJhc2U6ICdwbHVtcF90ZXN0JyB9KTtcbiAgICB9KTtcbiAgfSxcbiAgLy8gYWZ0ZXI6IChkcml2ZXIpID0+IHtcbiAgICAvLyByZXR1cm4gZHJpdmVyLnRlYXJkb3duKClcbiAgICAvLyAudGhlbigoKSA9PiBydW5TUUwoJ0RST1AgREFUQUJBU0UgcGx1bXBfdGVzdDsnKSk7XG4gIC8vIH0sXG59KTtcbiJdfQ==
