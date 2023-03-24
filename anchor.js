function  topLeftAnchor() {
  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()
  if(!pageElementRange){ console.log('Select a two shapes to perform this operation');return }
  if (pageElementRange){
    let elements = pageElementRange.getPageElements()
    if(elements.length !== 2){ console.log('Select a two shapes to perform this operation');return }

    let shape1 = elements[0].asShape()
    let shape2 = elements[1].asShape()

    let shape1Top = shape1.getTop()
    let shape1Left = shape1.getLeft()

    let shape2Top = shape2.getTop()
    let shape2Left = shape2.getLeft()

    // swap positions
    shape1.setLeft(shape2Left)
    shape1.setTop(shape2Top)

    shape2.setLeft(shape1Left)
    shape2.setTop(shape1Top)
  }
}

///%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function  topRightAnchor() {
  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()

  if(!pageElementRange){ console.log('Select a two shapes to perform this operation');return }

  if (pageElementRange){
    let elements = pageElementRange.getPageElements()
    if(elements.length !== 2){ console.log('Select a two shapes to perform this operation');return }

    let shape1 = elements[0].asShape()
    let shape2 = elements[1].asShape()

    let right1 = shape1.getLeft() + shape1.getWidth()
    let top1 = shape1.getTop()

    let right2 = shape2.getLeft() + shape2.getWidth()
    let top2 = shape2.getTop()

    // swap positions
    shape1.setLeft(right2 - shape1.getWidth())
    shape1.setTop(top2)

    shape2.setLeft(right1 - shape2.getWidth())
    shape2.setTop(top1)

  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


function  bottomLeftAnchor() {
  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()

  if(!pageElementRange){ console.log('Select a two shapes to perform this operation');return }

  if (pageElementRange){
    let elements = pageElementRange.getPageElements()
    if(elements.length !== 2){ console.log('Select a two shapes to perform this operation');return }

    let shape1 = elements[0].asShape()
    let shape2 = elements[1].asShape()

    let bottom1 = shape1.getTop() + shape1.getHeight()
    let left1 = shape1.getLeft()

    let bottom2 = shape2.getTop() + shape2.getHeight()
    let left2 = shape2.getLeft()

    // swap positions
    shape1.setTop(bottom2 - shape1.getHeight())
    shape1.setLeft(left2)

    shape2.setTop(bottom1 - shape2.getHeight())
    shape2.setLeft(left1)

  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function  bottomRightAnchor() {
  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()

  if(!pageElementRange){ console.log('Select a two shapes to perform this operation');return }

  if (pageElementRange){
    let elements = pageElementRange.getPageElements()
    if(elements.length !== 2){ console.log('Select a two shapes to perform this operation');return }

    let shape1 = elements[0].asShape()
    let shape2 = elements[1].asShape()

    let bottom1 = shape1.getTop() + shape1.getHeight()
    let right1 = shape1.getLeft() + shape1.getWidth()

    let bottom2 = shape2.getTop() + shape2.getHeight()
    let right2 = shape2.getLeft() + shape2.getWidth()

    // swap positions
    shape1.setTop(bottom2 - shape1.getHeight())
    shape1.setLeft(right2 - shape1.getWidth())

    shape2.setTop(bottom1 - shape2.getHeight())
    shape2.setLeft(right1 - shape2.getWidth())

  }
}

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


function  centerAnchor() {
  let selections = SlidesApp.getActivePresentation().getSelection()
  let pageElementRange = selections.getPageElementRange()

  if(!pageElementRange){ console.log('Select a two shapes to perform this operation');return }

  if (pageElementRange){
    let elements = pageElementRange.getPageElements()
    if(elements.length !== 2){ console.log('Select a two shapes to perform this operation');return }

    let shape1 = elements[0].asShape()
    let shape2 = elements[1].asShape()

    let centerX1 = shape1.getLeft() + shape1.getWidth() / 2.0;
    let centerY1 = shape1.getTop() + shape1.getHeight() / 2.0;

    let centerX2 = shape2.getLeft() + shape2.getWidth() / 2.0;
    let centerY2 = shape2.getTop() + shape2.getHeight() / 2.0;

    //swap
    shape1.setLeft(centerX2 - (shape1.getWidth() / 2.0))
    shape1.setTop(centerY2 - (shape1.getHeight() / 2.0))

    shape2.setLeft(centerX1 - (shape2.getWidth() / 2.0))
    shape2.setTop(centerY1 - (shape2.getHeight() / 2.0))

  }
}
