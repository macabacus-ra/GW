export const ungroupTable = () => {
    let presentation = SlidesApp.getActivePresentation()
    let selections = presentation.getSelection()
    let pageElementRange = selections.getPageElementRange()
    let currentPage =  selections.getCurrentPage()
    let colorScheme = currentPage.getColorScheme()

    if (!pageElementRange) {
        return{
            warning: true,
            info: false,
            message: 'Select a table to perform this operation'
        }

    } else {
        // no way to get ONLY tables from a pageElementRange
        // so we must loop through all *Selected* page elements and get the first table element
        let elements = pageElementRange.getPageElements()
        let tables = []

        // here we get the first table in the selection
        tables.push(elements.find((element) => element.getPageElementType() == 'TABLE'))

        if (tables.length === 0) {
            return {
                warning: true,
                info: false,
                message: 'Select a table to perform this operation'
            }
        } else {
            let table = tables[0].asTable() 
            let tableLeft = table.getLeft()
            let tableTop = table.getTop()
 
            // do the ungrouping
            let rows = table.getNumRows()
            let cols = table.getNumColumns()
            let currentTop = tableTop

            for ( let r = 0 ; r < rows ; r++ ) {
                let rowHeight = table.getCell(r, 0).getParentRow().getMinimumHeight()
                let currentLeft = tableLeft 

                for ( let c = 0 ; c < cols ; c++ ) {
                    
                    let cell = table.getCell(r, c)
                    
                    let columnWidth = cell.getParentColumn().getWidth()
                    let fillColorString ;
                    let fillColor = cell.getFill().getSolidFill().getColor()
                    let cellfillType = fillColor.getColorType()

                    if(cellfillType == 'THEME'){
                        let THEMECOLOR = fillColor.asThemeColor().getThemeColorType() // some kind of ACCENT1, ACCENT2, DARK1 etc
                        fillColorString = colorScheme.getConcreteColor(THEMECOLOR).asRgbColor().asHexString()
                    }else { 
                        fillColorString = fillColor.asRgbColor().asHexString() 
                    }

                    let cellText = cell.getText()

                    if(!cellText.isEmpty()){
                        // Check for empty text cells.
                        // Text within a table cell always terminates with a newline character. 
                        
                        let text = cellText.asRenderedString()
                        let str = text.replace(/\s+/g, '');
                        if(str.length > 0){

                            let fontColorString ;
                            let fontColor = cell.getText().getTextStyle().getForegroundColor()
                            let fontColorType = fontColor.getColorType()

                            if(fontColorType == 'THEME'){
                                let THEMECOLOR = fontColor.asThemeColor().getThemeColorType() // some kind of ACCENT1, ACCENT2, DARK1 etc
                                fontColorString = colorScheme.getConcreteColor(THEMECOLOR).asRgbColor().asHexString()
                            }else { 
                                fontColorString = fontColor.asRgbColor().asHexString() 
                            }

                            let textFont = cell.getText().getTextStyle().getFontFamily()
                            let fontSize = cell.getText().getTextStyle().getFontSize()
                            let bold = cell.getText().getTextStyle().isBold()
                            let italic = cell.getText().getTextStyle().isItalic()
                            let underline = cell.getText().getTextStyle().isUnderline()
                            let strikethrough = cell.getText().getTextStyle().isStrikethrough()

                            let newShape = currentPage.insertShape(
                                    SlidesApp.ShapeType.RECTANGLE, 
                                    currentLeft, 
                                    currentTop, 
                                    columnWidth, 
                                    rowHeight
                                )

                            newShape.getText().setText(text)
                            newShape.getText().getTextStyle().setFontSize(fontSize)
                            newShape.getText().getTextStyle().setFontFamily(textFont)
                            newShape.getText().getTextStyle().setBold(bold)
                            newShape.getText().getTextStyle().setItalic(italic)
                            newShape.getText().getTextStyle().setUnderline(underline)
                            newShape.getText().getTextStyle().setStrikethrough(strikethrough)
                            newShape.getText().getTextStyle().setForegroundColor(fontColorString) 
                            newShape.getFill().setSolidFill(fillColorString)
                            newShape.getBorder().setTransparent() 
                            currentLeft = currentLeft + columnWidth

                        }else {
                            let newShape = currentPage.insertShape(
                                SlidesApp.ShapeType.RECTANGLE, 
                                currentLeft, 
                                currentTop, 
                                columnWidth, 
                                rowHeight
                            ) 
                            newShape.getFill().setSolidFill(fillColorString)
                            newShape.getBorder().setTransparent() 
                            currentLeft = currentLeft + columnWidth
                        }
                    } 
                } 
                currentTop = currentTop + rowHeight
            } 
            table.remove() 
            return {
                message: 'success' 
            }
        }
    }
}
