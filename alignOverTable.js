function showAlignOverTableDialog(){
  const userProperties = PropertiesService.getUserProperties();
  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ SlidesApp.getUi().alert('No shapes selected!'); return  }

  if (pageElementRange){
    let elements = pageElementRange.getPageElements()
    if(elements.length === 1){ SlidesApp.getUi().alert('Select select two or more shapes to perform this operation'); return }
    
    let table = 0; let shapes = 0;
    for(let i = 0; i < elements.length; i++){
      if(elements[i].getPageElementType() === SlidesApp.PageElementType.SHAPE){ shapes += 1 }
      else if(elements[i].getPageElementType() === SlidesApp.PageElementType.TABLE){ table+=1 }
    }
    if(table > 1){ SlidesApp.getUi().alert("More than one table selected."); return; }

    if(table === 1 && shapes > 0){

      let html = HtmlService.createHtmlOutputFromFile('alignOTable').setWidth(400).setHeight(300);
      SlidesApp.getUi().showModalDialog(html, 'Cell Alignment');    
  
    }
  }
}



function alignOverTable(direction) {
  let direction1 = 'tlc'

  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()

  if(!pageElementRange){ SlidesApp.getUi().alert('No shapes selected!'); return  }
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()

    // Find the table and shapes
    let tables = []; let shapes = [];
    for(let i = 0; i < elements.length; i++){
      if(elements[i].getPageElementType() === SlidesApp.PageElementType.SHAPE){ shapes.push(elements[i]) }
      else if(elements[i].getPageElementType() === SlidesApp.PageElementType.TABLE){ tables.push(elements[i]) }
    }

    if(tables.length > 1){ SlidesApp.getUi().alert("More than one table selected."); return; }

    if(tables && shapes.length > 0){
      // Sort the shapes to be repositioned by position
      let sorted = shapes.sort((a, b) => { return a.getTop() - b.getTop() || a.getLeft() - b.getLeft()})

      // Find the closest cell in the table for each shape to be repositioned
      let listFilledCells = [] 
      
      let table = tables[0].asTable()
      let intRows = table.getNumRows()
      let intCols = table.getNumColumns()

      let tableEdges = {
        top: table.getTop(),
        right: table.getLeft(),
        left: table.getLeft(),
        bottom: table.getTop(),
      }

      // should also note the border widths .. maybe??

      let iState = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }

      let cellEdges = iState

      let tableArray = [] //create a two dimensional array with cell absolute x and y positions from "cellEdges" object for EACH cell.
      let currentRowTop = tableEdges.top;

      for(let rowIndex = 0; rowIndex < intRows; rowIndex++){
        let rowHeight = table.getCell(rowIndex, 0).getParentRow().getMinimumHeight() // used to determine table size, since Apps Script get height does not wqrk.
        tableEdges.bottom += rowHeight 
        let currColLeft = tableEdges.left 
        let cols = []

        for(let colIndex = 0; colIndex < intCols; colIndex++){
          
          let colWidth = table.getCell(0,colIndex).getParentColumn().getWidth()

          if(rowIndex === 0){ tableEdges.right += colWidth } // this is to keep track of TABLE total width since Apps Script does not provide that for tables
          // and we can get the right ege of the table by only doing this line above when the row index is 0      

          cellEdges.top = currentRowTop;
          cellEdges.left = currColLeft;
          cellEdges.right = currColLeft + colWidth
          cellEdges.bottom = currentRowTop + rowHeight

          cols.push(cellEdges)
          currColLeft += colWidth
        }
  
        tableArray.push(cols)
        currentRowTop += rowHeight;
      }



      // we now have the absolute coordinates of table and each cell, we are now able to determine if a shape is overlapping




      for(let i = 0; i < shapes.length; i++){
        let overlap = 0;
        let bestFillCell;
        let cellId;

        let shapeSize = {
          width: shapes[i].getWidth(),
          height: shapes[i].getHeight(),
          topEge: shapes[i].getTop(),
          rightEdge: shapes[i].getLeft() + shapes[i].getWidth(),
          bottomEdge: shapes[i].getTop() + shapes[i].getHeight(),
          leftEdge: shapes[i].getLeft()
        }; // use this to check intersection since Apps Script does not have a VSTO "Intersect()" equivalent



        for(let r = 0; r < intRows; r++){
          for(let c = 0; c < intCols; c++){
            let cell = table.getCell(r,c)

            cellId = `${r}-${c}` // used to record list flled

            if(!listFilledCells.find(ele => ele === cellId)){
              //continue with function

              let cellSize = tableArray[r][c]

              console.log(`---::  cell ${r} : ${c}  ::------`)
              console.log(cellSize)
              console.log(`----------------`)

              //does the current shape intersect the current cell?
            }
          }
        }
      }
    }
  }
}





