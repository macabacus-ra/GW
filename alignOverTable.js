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
  let direction2 = 'tch'
  let direction3 = 'trc'
  let direction4 = 'clv'
  let direction5 = 'center'
  let direction6 = 'crv'
  let direction7 = 'blc'
  let direction8 = 'bch'
  let direction9 = 'brc'
 

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

          // cellEdges.top = currentRowTop;
          // cellEdges.left = currColLeft;
          // cellEdges.right = currColLeft + colWidth
          // cellEdges.bottom = currentRowTop + rowHeight

          cols.push({
            top: currentRowTop,
            right: currColLeft + colWidth,
            bottom: currentRowTop + rowHeight,
            left: currColLeft,
            width: colWidth,
            height: rowHeight,
          })
          
          // cellEdges = iState
          currColLeft += colWidth

        }
  
        tableArray.push(cols)
        currentRowTop += rowHeight;
      }



      // **************************************************************************************************************************
      // we now have the absolute coordinates of table and each cell...  So we are now able to determine if a shape is overlapping
      // ******************************************************************************************************************
      // console.log(tableArray)


      for(let i = 0; i < shapes.length; i++){
        let overlap = 0;
        let bestFillCell = false;
        let bestFillCellAddress;
        let cellId;

        let shapeSize = {
          width: shapes[i].getWidth(),
          height: shapes[i].getHeight(),          
        }

        let shape = {
          top: shapes[i].getTop(),
          right: shapes[i].getLeft() + shapes[i].getWidth(),
          bottom: shapes[i].getTop() + shapes[i].getHeight(),
          left: shapes[i].getLeft()
        }; // use this to check intersection since Apps Script does not have a VSTO "Intersect()" equivalent

        let intersectionArea = 0;
        let intersectionCount = 0
        let intersectionArray = [];

        for(let r = 0; r < intRows; r++){
          for(let c = 0; c < intCols; c++){
            let cell = table.getCell(r,c)

            cellId = `${r}-${c}` // used to record list flled

            if(!listFilledCells.find(ele => ele === cellId)){
              //continue with function

              let cell = tableArray[r][c]
              
              let shapesIntersect = intersection(shape, cell)

              if(shapesIntersect){
                // console.log(`shape ${i} intersects cell: ${r}-${c}`)
                // calculate area of interection, the greatest area is where shape should belong
                let area = getArea(shape, cell)

                intersectionArray.push({
                  r: r,
                  c: c,
                  area: area
                })
              }
            }else{
              console.log(`cell already fitted`)
            }
          }
        } //end table cell looping

        if(intersectionArray.length > 1){
          // if shape overlaps more than one cell, get the most appropriate cell
          bestFillCellAddress = getLargestAreaCell(intersectionArray)
          bestFillCell = true

        }else if(intersectionArray.length === 1){
          bestFillCell = true
          bestFillCellAddress = {r: intersectionArray[0].r, c: intersectionArray[0].c}
        }

        if(bestFillCell){
          // console.log(` For shape ${shapes[i].asShape().getText().asString()}, the best fitting cell is ${JSON.stringify(bestFillCellAddress)}`)
          // Reposition the shape over the best cell

          // better readability
          let shp = shapes[i].asShape()

          // for readbility. This gives the object with all the cell coordinates { top, right, bottom, left, width, height } as stored from the first for loop
          let currCell = tableArray[bestFillCellAddress.r][bestFillCellAddress.c] 
          

          switch (direction9) {
            // ====================== top  =============================
            case 'tlc':
              shp.setLeft( currCell.left );
              shp.setTop( currCell.top );
              break;

            case 'tch':
              shp.setLeft((currCell.left + (currCell.width/2)) - (shp.getWidth()/2) );
              shp.setTop( currCell.top );
              break;

            case 'trc':
              shp.setLeft(currCell.right - shp.getWidth());
              shp.setTop( currCell.top );
              break;
            
            // ======================== middle ==============================

            case 'clv':
              shp.setLeft( currCell.left );
              shp.setTop( currCell.top + (currCell.height/2) - (shp.getHeight()/2) );
              break;
          
            case 'center':
              shp.setLeft( (currCell.left + (currCell.width/2)) - (shp.getWidth()/2) );
              shp.setTop( currCell.top + (currCell.height/2) - (shp.getHeight()/2) );
              break;

            case 'trc':
              shp.setLeft(currCell.right - shp.getWidth());
              shp.setTop( currCell.top + (currCell.height/2) - (shp.getHeight()/2) );
              break;

            // ========================== bottom ==========================

            case 'blc':
              shp.setLeft( currCell.left );
              shp.setTop( currCell.bottom - shp.getHeight()  );
              break;

            case 'bch':
              shp.setLeft( (currCell.left + (currCell.width/2)) - (shp.getWidth()/2) );
              shp.setTop( currCell.bottom - shp.getHeight()  );
              break;

            case 'brc':
              shp.setLeft( currCell.right - shp.getWidth() );
              shp.setTop( currCell.bottom - shp.getHeight()  );
              break;

          }
        }
        listFilledCells.push(`${bestFillCellAddress.r}-${bestFillCellAddress.c}`)
      }
    }
  }
}


function intersection(shape1, shape2){
  //"shape" and "cell" are objects with properties: {top, right, bottom, left} these values representing their positions on an active slide
  // the edges will *NOT* overlap, (meaning the rectangles will NOT intersect) if these conditions are true. Hence, we return the negated value to check for intersection. 
  // if the negation is true, we know they must intersect. 

  return !(
      shape2.left > shape1.right || shape2.right < shape1.left 
      ||
      shape2.top > shape1.bottom || shape2.bottom < shape1.top
    );
}


function getArea(shape1, shape2) {
    let left = Math.max(shape1.left, shape2.left);
    let right = Math.min(shape1.right, shape2.right);
    let top = Math.max(shape1.top, shape2.top);
    let bottom = Math.min(shape1.bottom, shape2.bottom);
    return (right - left) * (bottom - top);
}

function getLargestAreaCell(array){
  let max = 0;
  let cellId;
  for(let index=0; index < array.length; index++){
    if(array[index].area > max ){
      max = array[index].area
      cellId = { r: array[index].r, c: array[index].c}
    }
  }
  return cellId;
}


