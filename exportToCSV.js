var Results = [
    ["Col1", "Col2", "Col3", "Col4"],
    ["Data", 50, 100, 500],
    ["Data", -100, 20, 100],
    ];
    
    exportToCsv = function() {
      var CsvString = "";
      Results.forEach(function(RowItem, RowIndex) {
        RowItem.forEach(function(ColItem, ColIndex) {
          CsvString += ColItem + ',';
        });
        CsvString += "\r\n";
      });
      CsvString = "data:application/csv," + encodeURIComponent(CsvString);
      var x = document.createElement("A");
      x.setAttribute("href", CsvString );
      x.setAttribute("download","somedata.csv");
      document.body.appendChild(x);
      x.click();
    }