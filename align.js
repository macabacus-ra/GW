function alignLeft() {
  const userProperties = PropertiesService.getUserProperties(); 
  const firstShapeId = userProperties.getProperty('firstShapeId');
  if(!firstShapeId){SlidesApp.getUi().alert('Select a shape as first...'); return;}

  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()

    if(elements.length === 1){ elements[0].setLeft(0); return }    
    
    if(elements.length > 1){ 
      let shapes = {
        initialLeft: elements[0].getLeft().toFixed(4),
        areAligned: true
      };

      for (let i = 0; i < elements.length; i++) {
        let currentLeftPosition = elements[i].getLeft().toFixed(4)
        if (currentLeftPosition !== shapes.initialLeft) {
          shapes.areAligned = false; // there is a shape that is not aligned
          break;
        }
      }
      if(!shapes.areAligned){ 
        let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()

        elements.map((shape) => {
          let width = shape.getWidth()
          if(width && shape.getObjectId() !== firstShapeId ){ 
            shape.setLeft(firstSelectedShape.getLeft())
          }
        }); 
        return;
      }
      else if(shapes.areAligned && !(parseInt(shapes.initialLeft) === 0)){ 
        //if shapes are already aligned, align to the left of the page,
        elements.map( (shape) => {
          let width = shape.getWidth()
          if(width){ shape.setLeft(0) }
        }); 
        return;
      }

      else if(shapes.areAligned && (parseInt(shapes.initialLeft) === 0)){

      //if shapes are at edge, align to placeholder
      let masters = SlidesApp.getActivePresentation().getMasters()
      let placeholderLeft = masters[0].getPlaceholder(SlidesApp.PlaceholderType.BODY).getLeft()

        elements.map( (shape) => {
          let width = shape.getWidth()
          if(width){ 
            shape.setLeft(placeholderLeft) 
          }
        }); 
        return;
      }
    }
  }       
}

function alignRight() {
  let slideWidth = SlidesApp.getActivePresentation().getPageWidth()
  const userProperties = PropertiesService.getUserProperties(); 
  const firstShapeId = userProperties.getProperty('firstShapeId');
  if(!firstShapeId){SlidesApp.getUi().alert('Select a shape as first...'); return;}

  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()

    if(elements.length === 1){ elements[0].setLeft(slideWidth - elements[0].getWidth()) } // if only one shape is selected, set to left edge

    
    if(elements.length > 1){ 
      let shapes = {
        initialRight: (elements[0].getLeft() + elements[0].getWidth()).toFixed(4),
        areAligned: true
      };

      for (let i = 0; i < elements.length; i++) {
        let currentRightPosition = (elements[i].getLeft() + elements[i].getWidth()).toFixed(4)

        if (currentRightPosition !== shapes.initialRight) {
          shapes.areAligned = false; // there is a shape that is not aligned
          break;
        }
      }

      if(!shapes.areAligned){ 
        let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
        elements.map((shape) => {
            let width = shape.getWidth()
            if(width && shape.getObjectId() !== firstShapeId ){ 
              shape.setLeft((firstSelectedShape.getLeft() + firstSelectedShape.getWidth()) - width)
            }
        }); 
        return;
      }

      else if(shapes.areAligned && !(parseInt(shapes.initialRight) === slideWidth)){ 
        //if shapes are already aligned, align to the right of the page,
        elements.map( (shape) => {
          let width = shape.getWidth()
          if(width){ shape.setLeft(slideWidth - width) }
        }); 
        return;
      }

      else if(shapes.areAligned && (parseInt(shapes.initialRight) === slideWidth)){

      //if shapes are at edge, align to placeholder
      let masters = SlidesApp.getActivePresentation().getMasters()
      let placeholder = masters[0].getPlaceholder(SlidesApp.PlaceholderType.BODY).asShape()

      let placeholderRight = placeholder.getLeft() + placeholder.getWidth()

        elements.map( (shape) => {
          let width = shape.getWidth()
          if(width){ 
            shape.setLeft(placeholderRight - width) 
          }
        }); 
        return;
      }
    }
  }       
}

function alignTop() {
  const userProperties = PropertiesService.getUserProperties(); 
  const firstShapeId = userProperties.getProperty('firstShapeId');
  if(!firstShapeId){SlidesApp.getUi().alert('Select a shape as first...'); return;}

  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()

    if(elements.length === 1){ elements[0].setLeft(0); return }    
    
    if(elements.length > 1){ 
      let shapes = {
        initialTop: elements[0].getTop().toFixed(4),
        areAligned: true
      };

      for (let i = 0; i < elements.length; i++) {

        let currentTopPosition = elements[i].getTop().toFixed(4)

        if (currentTopPosition !== shapes.initialTop) {
          shapes.areAligned = false; // there is a shape that is not aligned
          break;
        }
      }

      if(!shapes.areAligned){ 
        let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()

          elements.map((shape) => {
            let width = shape.getWidth()
            if(width){ shape.setTop(firstSelectedShape.getTop()) }
          }); 
        return;
      }

      else if(shapes.areAligned && !(parseInt(shapes.initialTop) === 0)){ 
        //if shapes are already aligned, align to the left of the page,
        elements.map( (shape) => {
          let width = shape.getWidth()
          if(width){ shape.setTop(0) }
        }); 
        return;
      }

      else if(shapes.areAligned && (parseInt(shapes.initialTop) === 0)){

      //if shapes are at edge, align to placeholder
      let masters = SlidesApp.getActivePresentation().getMasters()
      let placeholderTop = masters[0].getPlaceholder(SlidesApp.PlaceholderType.BODY).getTop()

        elements.map( (shape) => {
          let width = shape.getWidth()
          if(width){ 
            shape.setTop(placeholderTop) 
          }
        }); 
        return;
      }
    }
  }       
}



function alignBottom() {
  let slideHeight = SlidesApp.getActivePresentation().getPageHeight()
  const userProperties = PropertiesService.getUserProperties(); 
  const firstShapeId = userProperties.getProperty('firstShapeId');
  if(!firstShapeId){SlidesApp.getUi().alert('Select a shape as first...'); return;}

  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()

    if(elements.length === 1){ elements[0].setTop(slideHeight - elements[0].getHeight()) } // if only one shape is selected, set to left edge

    
    if(elements.length > 1){ 
      let shapes = {
        initialBottom: (elements[0].getTop() + elements[0].getHeight()).toFixed(4),
        areAligned: true
      };

      for (let i = 0; i < elements.length; i++) {
        let currentBottomPosition = (elements[i].getTop() + elements[i].getHeight()).toFixed(4)

        if (currentBottomPosition !== shapes.initialBottom) {
          shapes.areAligned = false; // there is a shape that is not aligned
          break;
        }
      }

      if(!shapes.areAligned){ 
        let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
        elements.map((shape) => {
            let height = shape.getHeight()

            if(height && shape.getObjectId() !== firstShapeId ){ 
              shape.setTop((firstSelectedShape.getTop() + firstSelectedShape.getHeight()) - height)
            }
        }); 
        return;
      }

      else if(shapes.areAligned && !(parseInt(shapes.initialBottom) === slideHeight)){ 
        //if shapes are already aligned, align to the right of the page,
        elements.map( (shape) => {
          let height = shape.getHeight()
          if(height){ shape.setTop(slideHeight - height) }
        }); 
        return;
      }

      else if(shapes.areAligned && (parseInt(shapes.initialBottom) === slideHeight)){

      //if shapes are at edge, align to placeholder
      let masters = SlidesApp.getActivePresentation().getMasters()
      let placeholder = masters[0].getPlaceholder(SlidesApp.PlaceholderType.BODY).asShape()

      let placeholderBottom = placeholder.getTop() + placeholder.getHeight()

        elements.map( (shape) => {
          let height = shape.getHeight()
          if(height){ 
            shape.setTop(placeholderBottom - height) 
          }
        }); 
        return;
      }
    }
  }       
}

function centerHorizontally() {
  const userProperties = PropertiesService.getUserProperties(); 
  const firstShapeId = userProperties.getProperty('firstShapeId');
  if(!firstShapeId){SlidesApp.getUi().alert('Select a shape as first...'); return;}
  let slideWidth = SlidesApp.getActivePresentation().getPageWidth()
  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()

    if(elements.length === 1){   elements[0].setLeft( (slideWidth/2) - (elements[0].getWidth()/2) ); return  } 
    
    else if(elements.length > 1){ 

      let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
      let centerPos = (firstSelectedShape.getLeft() + (firstSelectedShape.getWidth()/2))

      elements.map((shape) => {
        let width = shape.getWidth()

        if(width && shape.getObjectId() !== firstShapeId ){ 
          shape.setLeft(centerPos - (width/2))
        }
      }); 
      return;

    }
  }       
}

function centerVertically() {

  const userProperties = PropertiesService.getUserProperties(); 
  const firstShapeId = userProperties.getProperty('firstShapeId');
  if(!firstShapeId){SlidesApp.getUi().alert('Select a shape as first...'); return;}

  let slideHeight = SlidesApp.getActivePresentation().getPageHeight()
  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ SlidesApp.getUi().alert('Select one or more shapes to perform this operation'); }
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()

    if(elements.length === 1){   elements[0].setTop( (slideHeight/2) - (elements[0].getHeight()/2) ); return  } 
    
    else if(elements.length > 1){ 
      let defaultVerticalCenter = (elements[0].getTop() + (elements[0].getHeight()/2)).toFixed(4)
      const userProperties = PropertiesService.getUserProperties();  // get user properties 
      const firstShapeId = userProperties.getProperty('firstShapeId');

      let firstSelectedShape = SlidesApp.getActivePresentation().getPageElementById(firstShapeId).asShape()
      let centerPos = (firstSelectedShape.getTop() + (firstSelectedShape.getHeight()/2))

      elements.map((shape) => {
        let height = shape.getHeight()

        if(height && shape.getObjectId() !== firstShapeId ){ 
          shape.setTop(centerPos - (height/2))
        }
      }); 
      return;
    }
  }       
}

