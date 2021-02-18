Attribute VB_Name = "Module1"


Sub stockCalculations()

Dim lastrow As Variant
Dim last_row As Variant
Dim column As Integer
Dim row As Integer
Dim rowVariable As Variant
Dim rowCounter As Variant
Dim rowCount As Variant
Dim ticker As String
Dim yearlyChng As Double
Dim percentChng As Variant
Dim prcntChngVar As Variant
Dim totalStock As LongLong
Dim tickerTitle As String
Dim yrlyChngTitle As String
Dim prcntChngTitle As String
Dim ttlStckTitle As String
Dim openingCell As Variant


tickerTitle = "Ticker"
yrlyChngTitle = "Yearly Change"
prcntChngTitle = "Percent Change"
ttlStckTitle = "Total Stock Volumn"



'Setting variables

  column = 1
  row = 2
  rowVariable = 2
  rowCounter = 2
  rowCount = 2
  openingCell = Cells(rowCount, 3).Value
  prcntChngVar = 1
    

  ' Set a variable for specifying the column of interest
  last_row = Cells(Rows.Count, 1).End(xlUp).row 'This line gets the last row
  lastrow = ActiveSheet.UsedRange.Rows.Count 'This line gets the last row
  'MsgBox (last_row) 'Testing variable
  'MsgBox (lastrow) 'Testing variable
  
  
  'MsgBox (ttlStckTitle) 'Testing variable
  
  'Setting title cell values
  Cells(1, 10).Value = tickerTitle
  Cells(1, 11).Value = yrlyChngTitle
  Cells(1, 12).Value = prcntChngTitle
  Cells(1, 13).Value = ttlStckTitle
  
  'Formating Yearly Change Column for currency
  Range("K2", "K1000").NumberFormat = "$#,##0.00"
  
 'loop through all the stocks for one year and output the following information.
 
 For i = 2 To lastrow
 
 
    'Setting the ticker symbol.
        ticker = Cells(i, column).Value
        
    'Calculating Yearly change from opening price to closing price at end of the year.
        
        
        'MsgBox (openingCell) testing variable
        yearlyChng = Cells(rowCounter, 6).Value - openingCell
       ' MsgBox (Cells(rowVariable, 3).Value)  testing variable
        
        
    'The percent change from opening price at the beginning of a given year to the closing price at the end of that year.
        
        'Check for division by zero
        If (Cells(rowCounter, 6).Value <> 0) Then
        
            percentChng = (100 - Round((openingCell / Cells(rowCounter, 6).Value) * 100, 0))
        
        Else
            
            percentChng = (100 - Round((openingCell / prcntChngVar) * 100, 0))
            
        End If
                    
        
        'MsgBox (percentChng) testing variable
        'MsgBox (rowCounter) testing variable
        rowCounter = rowCounter + 1
    
    'The total stock volume of the stock.
        totalStock = Cells(i, 7).Value + totalStock
        'MsgBox (totalStock) testing variable
    
        
    ' Searches for when the value of the next cell is different than that of the current cell
        If Cells(i + 1, column).Value <> Cells(i, column).Value Then
      'Message Box the value of the current cell and value of the next cell
      'MsgBox (Cells(i, column).Value & ” and then ” & Cells(i + 1, column).Value)
        
        'Outputting Values
        
        Cells(row, 10).Value = ticker
        Cells(row, 11).Value = yearlyChng
        Cells(row, 12).Value = percentChng
        Cells(row, 13).Value = totalStock
        
        'setting row counting variable for next ticker
        rowCount = rowCounter
        openingCell = Cells(rowCount + 1, 3).Value
        'MsgBox (openingCell) testing variable
        
        'Conditional formatting to highlight positive change in green and negative change in red.
        
        If (Cells(row, 11).Value < 0) Then
            Cells(row, 11).Interior.ColorIndex = 3 'Setting Red
        Else
            Cells(row, 11).Interior.ColorIndex = 4 'Setting Green
        End If
        
        If (Cells(row, 12).Value < 0) Then
            Cells(row, 12).Interior.ColorIndex = 3 'Setting Red
        Else
            Cells(row, 12).Interior.ColorIndex = 4 'Setting Green
        End If
                
        'Reseting Values
        
        
        yearlyChng = 0
        percentChng = 0
        totalStock = 0
        row = row + 1
        rowVariable = i
        rowCounter = i
        
        
        End If
    Next i
    

'If Cells(i, column).Value <> Cells(i - 1, column).Value Then

End Sub
