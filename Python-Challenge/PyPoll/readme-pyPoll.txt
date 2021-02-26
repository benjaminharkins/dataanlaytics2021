# Python Challenge--PyPoll


######################################################################
#This here is the Header where I imported my modules and my csv file.#
######################################################################

import os
import csv

pyPoll_csv = os.path.join(os.path.dirname(__file__), 'Resources', 'election_data.csv')

 
####################################################################################
#This here where I have a function to display my output in terminal and output file#
####################################################################################

# Define the function 
def election_calc(eData): #Calculation  Function

    file_object = open("PyPoll.txt","w+")
    
    
 #*   The total number of votes cast
    print("Election Results")
    print("-------------------------")
    print(f"Total Votes: {numVotes}")
    print("-------------------------")
    file_object.write("Election Results \r\n")
    file_object.write("------------------------- \r\n")
    file_object.write(f"Total Votes: {numVotes} \r\n")
    file_object.write("------------------------- \r\n")
  #* A complete list of candidates who received votes

  #* The percentage of votes each candidate won

  #* The total number of votes each candidate won
    print(f"Khan: {k_percentage}% ({k_total})")
    print(f"Correy: {c_percentage}% ({c_total})")
    print(f"Li: {l_percentage}% ({l_total})")
    print(f"O'Tooley: {o_percentage}% ({o_total})")
    file_object.write(f"Khan: {k_percentage}% ({k_total}) \r\n")
    file_object.write(f"Correy: {c_percentage}% ({c_total}) \r\n")
    file_object.write(f"Li: {l_percentage}% ({l_total}) \r\n")
    file_object.write(f"O'Tooley: {o_percentage}% ({o_total}) \r\n")
  #* The winner of the election based on popular vote.
    print("-------------------------")
    print(f"Winner: {winner}")
    file_object.write("------------------------- \r\n")
    file_object.write(f"Winner: {winner} \r\n")
    file_object.close() 

######################################
#This where I am reading my csv file.#
######################################

#============================================================
# Reading in the CSV file

with open(pyPoll_csv, 'r') as myfile:

    # Split the data on commas
    csvreader = csv.reader(myfile, delimiter=',')
 
    lines = list(csvreader)


########################################################################
#This where I set up most of my vaiables to be used throughout my code.#
########################################################################
 #============================================================
 # Setting variables
    
    numlines = len(lines)
    numVotes = numlines - 1
    sorted_lines_list = sorted(lines, key=lambda x: x[2])
    #print(sorted_lines_list[3201001][2])#testing variable

    #print(lines)
    #print(numlines)  #testing variable
    Khan_list = []
    Correy_list = [] 
    Li_list = []
    oTooley_list = []
    kString = "Khan"
    cString = "Correy"
    lString = "Li"
    oString = "O'Tooley"

    #header = next(csvreader)

####################################################################################
#This where I am looping through my csv file and creating lists for each candidate.#
####################################################################################

#============================================================    
# Looping through the data
    
    for i in range(1, numlines):
        #print(lines[:10]) #testing 
        #print(i) #testing variable and placeholder
#============================================================
# looping using the sorted_lines_list[i][2] value and creating lists for each contestant
   
        if (sorted_lines_list[i][2] == kString):
            Khan_list.append(sorted_lines_list[i])
        elif(sorted_lines_list[i][2] == cString):
            Correy_list.append(sorted_lines_list[i])
        elif (sorted_lines_list[i][2] == lString):
            Li_list.append(sorted_lines_list[i])
        elif (sorted_lines_list[i][2] == oString):
            oTooley_list.append(sorted_lines_list[i])
           

###############################################################################################################
#This where I am getting the total votes for each candidate using the length funtion of their respective list.#
###############################################################################################################
#============================================================
# Getting the length of lists to determine the number of votes for each contestant
   
    k_total = (len(Khan_list))
    c_total = (len(Correy_list))
    l_total = (len(Li_list))
    o_total = (len(oTooley_list))



#################################################################################################################
#This where I am determining the percentage of the total votes each contestant received and checking the winner.#
#################################################################################################################
#============================================================
# Determining the  percentage of the total votes each contestant attained

    k_percentage = round((k_total / numVotes) * 100, 4)
    c_percentage = round((c_total / numVotes) * 100, 4)
    l_percentage = round((l_total / numVotes) * 100, 4)
    o_percentage = round((o_total / numVotes) * 100, 4)

#============================================================
# Checking which contestant has more than 50% of the votes to be declared winner

    if (c_percentage > 50):
        winner = "Correy"
    elif (l_percentage > 50):
        winner = "O'Tooley"
    elif (l_percentage > 50):
        winner = "Li"
    elif (k_percentage > 50):
        winner = "Khan"

##############################################
#This where I am calling the output function.#
##############################################
#============================================================
# Calling function

    #print(k_percentage) #testing variable
    #print(k_total)#testing variable
    #print(c_total)#testing variable
    #print(l_total)#testing variable
    #print(o_total)#testing variable
    #print(pL_total) #testing variable
    election_calc(lines) #Calling module