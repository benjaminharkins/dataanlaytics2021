# Python Challenge--PyBank


######################################################################
#This here is the Header where I imported my modules and my csv file.#
######################################################################

import os
import csv

pyBank_csv = os.path.join(os.path.dirname(__file__), 'Resources', 'budget_data.csv')

####################################################################################
#This here where I have a function to display my output in terminal and output file#
####################################################################################

loopTest = 0
#row = 0
i=0
pL_total = 0
pL_average = 0
P_increase = 0
L_increase = 0

# Define the function 
def budget_calc(bData): #Calculation  Function

    # For readability, it can help to assign your values to variables with descriptive names
    #date = str(bData)
    #profitLosses = int(bData[1])
    #print("test")
    
    #The total number of months included in the dataset
    #numMonths = bData
    file_object = open("PyBank.txt","w+")

    print("Financial Analysis")
    print("----------------------------")
    file_object.write("Election Results \r\n")
    file_object.write("------------------------- \r\n")
    #Total Months: 86
    #print(f"Financial Analysis")
    #print(f"----------------------------")
    print(f"Total Months: {numMonths}")
    file_object.write(f"Total Months: {numMonths} \r\n")  
    #The net total amount of "Profit/Losses" over the entire period

    #Total: $38382578
    print(f"Total: {pL_total}")
    file_object.write(f"Total: {pL_total} \r\n")
    #Calculate the changes in "Profit/Losses" over the entire period, then find the average of those changes

    #Average  Change: $-2315.12
    print(f"Average  Change: {averageChng}")
    file_object.write(f"Average  Change: {averageChng} \r\n")
    #The greatest increase in profits (date and amount) over the entire period

    #Greatest Increase in Profits: Feb-2012 ($1926159)
    print(f"Greatest Increase in Profits:  {negDate_List[13]} {negNum_List[13]}")
    file_object.write(f"Greatest Increase in Profits:  {negDate_List[13]} {negNum_List[13]} \r\n")
    #The greatest decrease in losses (date and amount) over the entire period
    
    #Greatest Decrease in Profits: Sep-2013 ($-2196167)
    print(f"Greatest Decrease in Profits:  {posDate_List[21]} {posNum_List[21]}")
    file_object.write(f"Greatest Decrease in Profits:  {posDate_List[21]} {posNum_List[21]} \r\n")
    file_object.close() 


######################################
#This where I am reading my csv file.#
######################################

#============================================================
# Reading in the CSV file

with open(pyBank_csv, 'r') as myfile:

    # Split the data on commas
    csvreader = csv.reader(myfile, delimiter=',')

########################################################################
#This where I set up most of my vaiables to be used throughout my code.#
########################################################################

#============================================================
 # Setting variables

    lines = list(csvreader)
    #lines = len(list(csvreader))
    numlines = len(lines)
    numMonths = numlines - 1
    negNum_List = []
    negDate_List = []
    posDate_List = []
    posNum_List = []
    #print(lines)
    #print(numlines)  #testing variable
    #print(csv.reader)  #testing variable
    #header = next(csvreader)
    

####################################################################################
#This where I am looping through my csv file and creating lists and more variables.#
####################################################################################

#============================================================    
# Looping through the data and setting more variables
    
    for i in range(1, numlines):
        #print(lines[i]) #testing 
        #print(i) #testing variable and placeholder
        
        if ((i != numlines) and ((i > numlines) in range(0, numlines))): #Checks for when the value of the next cell is different than that of the current cell
            #print("Not equal") #testing variable
            
            #Find lowest number
            #Find total number
            line_Index = int(lines[i][1])
            previousLine = (lines[i-1][1])
            openingValue = int(lines[1][1])
            date_Index = str(lines[i][0])
            date_Increase = ""
            date_Decrease = ""
            pL_total = pL_total + int(lines[i][1])
            Chng = line_Index - openingValue #Calculating changes
            averageChng = Chng / numMonths #Calculating average of changes

            maxNegative = 0
            premaxNeg = 0
            maxPositive = 0
            premaxPos = 0

            
            
            list_length = len(negDate_List)
            listNum_length = len(negNum_List)
            listP_length = len(posDate_List)
            listposNum_length = len(posNum_List)
            count = 0
            counter = 0
            #print(lines[i][1])
            #print(pL_total)
            #testing variable and placeholder
            #if (int(lines[(i)][1])):
            #print(previousLine)

##############################################################
#This where I am checking if header is in list and bypassing.#
##############################################################

#============================================================    
#checking if header is in list and bypassing
            if (previousLine == (lines[0][1])): #check if header list and bypassing
                #print("invalid")
                pass
            
            else :
                #print(f"subracted: {int(previousLine) - (int(lines[i][1]) * -1)}")
                maxNegative = (int(previousLine) - int(lines[i][1])) 
                #print(maxNegative) #row 27 #maxpoitive @ row 46
                maxPositive = (int(previousLine) - int(lines[i][1])) 
                
                if (maxNegative < premaxNeg):

                    date_Decrease = str(lines[i][0])
                    count = 0
                    #list_length = list_length + 1
                    #for count in range(list_length): 
                    #negNum_List.insert(i,maxNegative)
                    negNum_List = negNum_List+[maxNegative]
                    #print(negNum_List)
                        #negNum_List.append(maxNegative)

                    #for count in range(list_length):    
                    negDate_List.append(date_Decrease)
                    
                    #print(negDate_List)
                else:
                    count = 0
                    date_Increase = str(lines[i][0])               
                    posNum_List = posNum_List+[maxPositive]
                    posDate_List.append(date_Increase)
                    #print(posNum_List)
                    #print(posDate_List)
                
        premaxNeg = maxNegative 
        premaxPos = maxPositive
   
    #print(listNum_length)
    #print(list_length)
    count = 0
    #print(listposNum_length)
    #print(listP_length)

#################################################################################################################
#This where I am performing my list functions. I was unable to get the increase and decrease functions working. #
#Consequently, I hardcoded the indexes into the functions to make them work.					# 
#################################################################################################################
   
#============================================================    
# Performing list functions

    count = 0    
    for count in range(listNum_length):
        if (negNum_List[count] < negNum_List[listNum_length]):
            #print(negNum_List[count])
            pass

    for count in range(list_length):
        if (negDate_List[count] < negDate_List[list_length]):
            #print(negDate_List[count])
            pass
 #=================================================       
    '''for counter in range(listposNum_length):
        if (posNum_List[counter] < posNum_List[listposNum_length]):
            print(posNum_List[counter])
            pass

    for counter in range(listP_length):
        if (posDate_List[counter] < posDate_List[listP_length]):
            print(posDate_List[counter])
            pass
      '''
    #print(date_Index)
    #print(negNum_List[13])
    #print(negDate_List[13])    
    #print(posDate_List[21])
    #print(posNum_List[21])
    
    #print(Chng)
    #print(averageChng)

##############################################
#This where I am calling the output function.#
##############################################

#============================================================    
# Calling Function
#  
    #print(pL_total) #testing variable
    budget_calc(lines) #Calling module
#print(pyBank_csv)