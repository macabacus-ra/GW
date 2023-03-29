

      let positionToShiftTo;
      let misalignmentRound = 1;
      let gapTolerance = 9;

      let obj = {
        nudgedShapesCount: 0,
        top: 0,
        isTopMisaligned: false,
        left: 0,
        isLeftMisaligned: false,
        right: 0,
        isRightMisaligned: false,
        bottom: 0,
        isBottomMisaligned: false
      };



      let shapesAlignedObj = {
        shapesSelected: 0,
        shapesAligned: 0,
      }

function autoAlign() {
   
  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }

  if (pageElementRange){

    let elements = pageElementRange.getPageElements()
    let shapes = elements

    if(shapes.length === 1){ SlidesApp.getUi().alert('Select 3 or more shapes to perform this operation'); return }    

    const shapeCount = elements.length

    if (shapeCount > 2) {

      // 'Get the misalignment tolerance = 9 points = 1/8";
      // don't want to make this any bigger because it could have unintended alignment consequences
      // create a collection of shapes we want to compare

      let shapesToCompare = getComparisonShapes(shapes);
      // begin checking shapes for misalignment

      










      let listNudged = [];
      shapesToCompare.map(async (shape, index) => {

        console.log(`shapesToCompare ${index} top: ${shape.getTop()}`)

        let blnAlignedTop = false;
        let blnAlignedLeft = false;

        //Find all shapes on the slide whose TOP position is close or equal to the top position of this shape, including this shape
        if (isTopMisaligned(shapesToCompare, shape.getTop(), gapTolerance)) {

          console.log(`setting top to => ${obj.top}`)

          shape.setTop(obj.top);
          blnAlignedTop = true;
          listNudged.push({ shape: "Nudged Top", id: shape.getObjectId() });
          
        }
        if (isLeftMisaligned(shapesToCompare, shape.left, gapTolerance)) {
          shape.setLeft(obj.left);
          blnAlignedLeft = true;
          listNudged.push({ shape: "Nudged Left", id: shape.getObjectId() });
          
        }
        if (!blnAlignedTop) {
          let bottom = Number(shape.getTop()) + Number(shape.getHeight());
          let shapeBottom = bottom.toFixed(2);
          if (isBottomMisaligned(shapesToCompare, shapeBottom, gapTolerance)) {
            shape.setTop(obj.bottom - shape.getHeight())
            listNudged.push({ shape: "Nudged Bottom", id: shape.getObjectId() });
            
          }
        }
        if (!blnAlignedLeft) {
          let right = Number(shape.getLeft()) + Number(shape.getWidth());
          let shapeRight = right.toFixed(2);
          if (isRightMisaligned(shapesToCompare, shapeRight, gapTolerance)) {
            listNudged.push({ shape: "Nudged Right", id: shape.getObjectId() });
            shape.setLeft(obj.right - shape.getWidth())
            
          }
        }
      });
      

      shapesAlignedObj.shapesAligned = listNudged.length;
      shapesAlignedObj.shapesSelected = shapeCount;

      console.log(listNudged.length + " Shapes aligned");

    } else if (shapeCount === 2) {      
      shapesAlignedObj.shapesSelected = 2
      console.log("Select at least 3 shapes to perform this operation");

    } else if(shapeCount === 0){
      console.log("Will get all shapes in current slide");
    }
  }
} 

//==================================================
function getComparisonShapes(shapes) {
  let shapesToCompareArr = [];
  shapes.map((shape) => {
    // we dont't have the ability to ignore shapes outside of the slide area because
    // we do not have access to the slide dimensions.
    // we can exlcude shapes from this list that are unsupported
    // https://learn.microsoft.com/en-us/javascript/api/powerpoint/powerpoint.shapetype?view=powerpoint-js-preview
    if (shape.getPageElementType() !== SlidesApp.PageElementType.UNSUPPORTED) {
      shapesToCompareArr.push(shape);
    }
  });
  return shapesToCompareArr;
}
//============================================================
function isTopMisaligned(shapes, currentShapeTop, tolerance) {
  console.log('IsTopMisaligned started')

  let listCompare = shapes.filter((shape) => isPositionSimilar(currentShapeTop, shape.getTop(), tolerance));
  //We need at least 3 shapes to determine misalignment. If at least three shapes were found with approximately the same or equal top position, determine dominant top position among these shapes
  if (canCompare(listCompare)) {
    let qry = vbaQueryFuncToJS(listCompare, "top");

    
    


    if (qry.length >= 2 && qry[0].length > qry[1].length) {

      let qryTop = qry[0][0].getTop()
      
      console.log(`################`)
      console.log(qryTop)
      console.log(`################`)
      console.log(currentShapeTop)
      console.log(`#####^ currentShapeTop ^########`)



      //We have a dominant convention. If the shape's position doesn't match dominant convention, make it.
      if (currentShapeTop !== qryTop) {

        console.log(`qryTop  ***** RAN****`)
        console.log(qryTop)

        // here I need to set a variable to tell the current shape to change its position
        obj.top = Number(qryTop);
        // list compare is empty so that the shape is not compared again

        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

        return true;
      } else {
        return false;
      }
    }
  }
}
//============================================================
function isLeftMisaligned(shapes, currentShapeLeft, tolerance) {
  console.log('IsLeftMisaligned ran')

  let listCompare = shapes.filter((shape) => isPositionSimilar(currentShapeLeft, shape.left, tolerance));
  //We need at least 3 shapes to determine misalignment. If at least three shapes were found with approximately the same or equal top position, determine dominant top position among these shapes
  if (canCompare(listCompare)) {
    let qry = vbaQueryFuncToJS(listCompare, "left");
    if (qry.length >= 2 && qry[0].length > qry[1].length) {
      //We have a dominant convention. If the shape's position doesn't match dominant convention, make it.
      if (currentShapeLeft !== qry[0][0].getLeft()) {
        // here I need to set a variable to tell the current shape to change its position
        obj.left = qry[0][0].getLeft();
        // list compare is empty so that the shape is not compared again
        return true;
      } else {
        console.log("--");
      }
    }
  }

    console.log('IsLeftMisaligned ended')
}
//==================================================================================================
function isBottomMisaligned(shapes, currentShapeBottom, tolerance) {
  let listCompare = [];
  shapes.map((shape) => {

    let sum = Number(shape.top) + Number(shape.height);
    let shapeBottom = sum.toFixed(2);
    if (isPositionSimilar(currentShapeBottom, shapeBottom, tolerance)) {
      listCompare.push(shape);
    }
  });
  if (canCompare(listCompare)) {
    let qry = vbaQueryFuncToJS(listCompare, "bottom");
    if (qry.length >= 2 && qry[0].length > qry[1].length) {
      let btmSum = qry[0][0].getTop() + qry[0][0].getHeight();
      let qryBottom = btmSum.toFixed(2);
      if (currentShapeBottom !== qryBottom) {
        obj.bottom = qryBottom;
        // list compare is empty so that the shape is not compared again
        return true;
      }
    }
  }
}
//==================================================================================================
function isRightMisaligned(shapes, currentShapeRight, tolerance) {
  let listCompare = [];
  shapes.map((shape) => {
    let sum = Number(shape.left) + Number(shape.width);
    let shapeRight = sum.toFixed(2);
    if (isPositionSimilar(currentShapeRight, shapeRight, tolerance)) {
      listCompare.push(shape);
    }
  });
  if (canCompare(listCompare)) {
    let qry = vbaQueryFuncToJS(listCompare, "right");
    if (qry.length >= 2 && qry[0].length > qry[1].length) {
      let qryRight = qry[0][0].getLeft() + qry[0][0].getWidth();
      let rightEdge = qryRight.toFixed(2);
      if (currentShapeRight !== rightEdge) {
        obj.right = rightEdge;
        // list compare is empty so that the shape is not compared again
        return true;
      }
    }
  }
}
//============================================================================================

function canCompare(array) {
    return array.length >= 3;
}

//=============================================================================================
function vbaQueryFuncToJS(array, pos) {
  // groups the shapes with equal positions into an object
  let objectWithGroups;
  switch (pos) {


    case "top":
      objectWithGroups = array.reduce((groups, item) => {
        let top = Number(item.getTop());
        let groupNumber = top.toFixed(2);

        const group = groups[groupNumber] || [];

        group.push(item);
        groups[groupNumber] = group;

        return groups;
      }, {});
      break;


    case "left":
      objectWithGroups = array.reduce((groups, item) => {
        let left = Number(item.getLeft());
        let groupNumber = left.toFixed(2);

        const group = groups[groupNumber] || [];

        group.push(item.getLeft());
        groups[groupNumber] = group;
        return groups;
      }, {});
      break;



    case "right":
      objectWithGroups = array.reduce((groups, item) => {

        let right = Number(item.getLeft()) + Number(item.getWidth());
        let groupNumber = right.toFixed(2);

        const group = groups[groupNumber] || [];

        group.push(item);
        groups[groupNumber] = group;
        return groups;

      }, {});
      break;




    case "bottom":
      objectWithGroups = array.reduce((groups, item) => {
        let bottom = Number(item.getTop()) + Number(item.getHeight());
        let groupNumber = bottom.toFixed(2);

        const group = groups[groupNumber] || [];

        group.push(item);
        groups[groupNumber] = group;
        return groups;
      }, {});
      break;
  }
  // place each key.value (its one array containing all shapes of equal position) into an array to sort
  // this might not be necessary as we can also loop through key-values and store the largest array
  // using value.length which will contain the dominant position because it will have the most shapes with
  // equal position, essentially the dominant position. In this case we create an array of array of shapes
  // so that we can later sort on largest array.... so that we can then sort and compare
  // as is done in the VBA algorithm
  let rawQueryArray = [];
  for (const [key, value] of Object.entries(objectWithGroups)) {
    rawQueryArray.push(value);
  }
  //sort the array by largest length
  let query = rawQueryArray.sort((a, b) => b.length - a.length);
  // console.log(query);
  // we now have an array (query) to compare which is the variable called "qry" in the VBA code after "canCompareShapes"

  return query;
  
  
}


//================================================================================================
function isPositionSimilar(p0, p1, tolerance) {
  // is current shape edge position within tolerance value?
  //  p1 > p0 - tol && p1 < p0 + tol; <-- condition from VSTO didn't provide expected results

  return (Math.abs(p0 - p1) < tolerance);

}
