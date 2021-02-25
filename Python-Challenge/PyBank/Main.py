#PyBank

import os
import csv

pyBank_csv = os.path.join(os.path.dirname(__file__), 'Resources', 'budget_data.csv')

loopTest = 0
#row = 0
i=0
pL_total = 0


# Define the function 
def budget_calc(bData): #Calculation  Function

    # For readability, it can help to assign your values to variables with descriptive names
    date = str(bData)
    #profitLosses = int(bData[1])
    print("test")
    
    #The total number of months included in the dataset
    #numMonths = bData

    print("Financial Analysis")
    print("----------------------------")
    #Total Months: 86
    #print(f"Financial Analysis")
    #print(f"----------------------------")
    print(f"Total Months: {numMonths}")
      
    #The net total amount of "Profit/Losses" over the entire period

    #Total: $38382578
    print(f"Total: {pL_total}")

    #Calculate the changes in "Profit/Losses" over the entire period, then find the average of those changes

    #Average  Change: $-2315.12
    #print(f"Average  Change: {}")

    #The greatest increase in profits (date and amount) over the entire period

    #Greatest Increase in Profits: Feb-2012 ($1926159)
    #print(f"Greatest Increase in Profits:  {} {}")

    #The greatest decrease in losses (date and amount) over the entire period
    
    #Greatest Decrease in Profits: Sep-2013 ($-2196167)
    #print(f"Greatest Decrease in Profits:  {} {}")

# Read in the CSV file
with open(pyBank_csv, 'r') as myfile:

    # Split the data on commas
    csvreader = csv.reader(myfile, delimiter=',')
 
    lines = list(csvreader)
    #lines = len(list(csvreader))
    numlines = len(lines)
    numMonths = numlines - 1
    

    print(lines)
    print(numlines)  #testing variable
    #print(csv.reader)  #testing variable
    #header = next(csvreader)
    
    # Loop through the data
    #for i in csvreader:
    for i in range(1, numlines):
        #print(lines[i]) #testing 
        print(i) #testing variable and placeholder

        if ((i != numlines) and ((i > numlines) in range(0, numlines))): #Checks for when the value of the next cell is different than that of the current cell
            print("Not equal") #testing variable

            #Find lowest number
            #Find total number
            pL_total = pL_total + int(lines[i][1])
            #print(lines[i][1])
            #print(pL_total)
            #testing variable and placeholder

        ''' 
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
        rowCounter = i'''
    print(pL_total) #testing variable
    budget_calc(lines) #Calling module
#print(pyBank_csv)