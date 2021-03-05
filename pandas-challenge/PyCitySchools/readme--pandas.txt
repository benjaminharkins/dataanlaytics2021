# pandas Challenge--Pycityschools



#########################################################################
#This here is the Header where I imported my modules and my dependencies#
#########################################################################

# Dependencies and Setup
import pandas as pd
import numpy as np
import os


############################################################################
#This here is where I imported my csv files and created the main dataframe #
############################################################################


# File to Load (Remember to Change These)
school_data_csv = os.path.join(os.path.dirname(__name__), 'Resources', 'schools_complete.csv')
student_data_csv = os.path.join(os.path.dirname(__name__), 'Resources', 'students_complete.csv')

# Read School and Student Data File and store into Pandas DataFrames
schoolData = pd.read_csv(school_data_csv)
studentData = pd.read_csv(student_data_csv)

# Combine the data into a single dataset.  
schoolDataMerged = pd.merge(studentData, schoolData, how="left", on=["school_name", "school_name"])

#schoolDataMerged.head() #testing variable

#################################################
#This here is where I tested the main dataframe #
#################################################


schoolData.head()

studentData.head()

######################################################################################
This here is where I performed the below actions: 				     #
				     						     #
District Summary:								     #
Calculate the total number of schools						     #
Calculate the total number of students						     #
Calculate the total budget							     #
Calculate the average math score						     #
Calculate the average reading score						     #
Calculate the percentage of students with a passing math score (70 or greater)	     #
Calculate the percentage of students with a passing reading score (70 or greater)    #
Calculate the percentage of students who passed math and reading (% Overall Passing) #
Create a dataframe to hold the above results					     #
######################################################################################

#Calculate the total number of schools

totalSchools = schoolData["School ID"].count()
#print(totalSchools) #testing variable

#Calculate the total number of students

totalStudents = studentData["Student ID"].count()
#print(totalStudents) #testing variable

#Calculate total budget

totalBudget = schoolData['budget'].sum()
#print(totalBudget) #testing variable

#Calculate the average math score
avgMathScore = studentData["math_score"].mean()
#print(avgMathScore) #testing variable


#Calculate the average reading score
avgReadingScore = studentData["reading_score"].mean()
#print(avfReadingScore) #testing variable

#Calculate the percentage of students with a passing math score (70 or greater)

mathPassCount = studentData[studentData["math_score"]>= 70].count()

mathPassPercent = (mathPassCount["math_score"] / totalStudents) * 100
#print(mathPassPercent) #testing variable
#print(mathPassCount) #testing variable

#Calculate the percentage of students with a passing reading score (70 or greater)

readingPassCount = studentData[studentData["reading_score"]>= 70].count()

readingPassPercent = (readingPassCount["reading_score"] / totalStudents) * 100
#print(readingPassCount) #testing variable
#print(readingPassPercent) #testing variable


#Calculate the percentage of students who passed math and reading (% Overall Passing)

overallPassCount = studentData[(studentData["math_score"]>= 70) & (studentData["reading_score"]>= 70)].count()

overallPassPercent = (overallPassCount["math_score"] / totalStudents) * 100
#print(overallPassCount) #testing variable
#print(overallPassPercent) #testing variable


#Create a dataframe to hold the above results
districtTotals = [{"Total Schools": totalSchools,"Total Students" : totalStudents, "Total Budget": totalBudget, "Average Math Score": avgMathScore,"Average Reading Score":avgReadingScore,"% Passing Math": mathPassPercent,"% Passing Reading":readingPassPercent, "% Overall Passing":overallPassPercent}]

disctrict_df = pd.DataFrame(districtTotals)


disctrict_df

######################################################################################
This here is where I performed the below actions: 				     #
				     						     #
School Summary:								     	     #
Create an overview table that summarizes key metrics about each school, including:   #
  * School Name									     #
  * School Type									     #
  * Total Students								     #
  * Total School Budget								     #
  * Per Student Budget								     #
  * Average Math Score								     #
  * Average Reading Score							     #
  * % Passing Math								     #
  * % Passing Reading								     #
  * % Overall Passing (The percentage of students that passed math **and** reading.) #
  * Create a dataframe to hold the above results				     #
######################################################################################

# Group by COMPLETE DATA of Schools and Students 
mergedGroup = schoolDataMerged.groupby('school_name')

budgetStudents = schoolData["budget"]/schoolData["size"]
schoolData["Budget per Student"] = budgetStudents

schoolData.budget = schoolData.budget.astype(float)
schoolData.budget = schoolData.budget.map("${:,.2f}".format)

schoolData = schoolData.set_index('school_name')

#schoolData.head() #testing variable

#to get avearge values
schoolDataMerged['pass_math'] = np.where(schoolDataMerged['math_score'] >=70, True, False)
schoolDataMerged['pass_reading'] = np.where(schoolDataMerged['reading_score'] >=70, True, False)
schoolDataMerged['overall_pass'] = np.where( (schoolDataMerged['reading_score'] >=70)  & (schoolDataMerged['math_score'] >=70), True, False)

#schoolDataMerged.head() #testing variable


averageScores = schoolDataMerged.groupby(["school_name"])
average_df = averageScores["math_score","reading_score", "pass_math", "pass_reading", "overall_pass"].mean() 
 
average_df["pass_math"] = (average_df["pass_math"]*100)
average_df["pass_reading"] = (average_df["pass_reading"]*100)

average_df["overall_pass"] = (average_df["overall_pass"]*100)
    
#averageScores["math_score","reading_score"].mean() #testing variable

average_df.columns = ['AverageMathScore', 'AverageReadingScore', '%PassMath', '%PassReading', '%OverallPass']
#average_df.head(10) #testing variable


#Combine TWO data frames by using key "School name" average_df , schoolData

merge_df = schoolData.merge(average_df, left_index=True, right_index=True)
merge_df.columns = ['School Id', 'School Type', 'School Size', 'Budget', 'Per Student Budget', 'AverageMathScore', 'AverageReadingScore',
                   '%PassMath', '%PassReading', '%OvearllPass']

merge_df.head() #testing variable


######################################################################################
This here is where I performed the below actions: 				     #
				     						     #
Top Performing Schools (By % Overall Passing)					     #
Sort and display the top five performing schools by % overall passing.		     #
######################################################################################

# TOP performing schools by % Overall Passing 
merge_df.sort_values('%OvearllPass',ascending=False).head()


######################################################################################
This here is where I performed the below actions: 				     #
				     						     #
Bottom Performing Schools (By % Overall Passing)				     #
Sort and display the five worst-performing schools by % overall passing.	     #
######################################################################################

# BOTTOM performing schools by % Overall Passing  
merge_df.sort_values('%OvearllPass',ascending=True).head()


######################################################################################
This here is where I performed the below actions: 				     #
				     						     #
Math Scores by Grade:								     #
Create a table that lists the average Reading Score for students of each grade level #
(9th, 10th, 11th, 12th) at each school.						     #
Create a pandas series for each grade. Hint: use a conditional statement.	     #
Group each series by school.							     #
Combine the series into a dataframe						     #
######################################################################################

#MATH CODE THIS code identifies by grade math scores and creates series elements and combines them into signle data frame

schoolDataMerged.head() #testing variable

school9th_mdf = schoolDataMerged.loc[( schoolDataMerged["grade"] == "9th" ) ] 
school10th_mdf = schoolDataMerged.loc[( schoolDataMerged["grade"] == "10th" ) ] 
school11th_mdf = schoolDataMerged.loc[( schoolDataMerged["grade"] == "11th" ) ] 
school12th_mdf = schoolDataMerged.loc[( schoolDataMerged["grade"] == "12th" ) ] 


school9th_mdf = school9th_mdf[["school_name", "grade", "math_score"]]
school9th_mdf.rename(columns = {'math_score' : 'MATH9'})

school9th_mdf.head(5) #testing variable

school10th_mdf = school10th_mdf[["school_name", "grade", "math_score"]]
school11th_mdf = school11th_mdf[["school_name", "grade", "math_score"]]
school12th_mdf = school12th_mdf[["school_name", "grade", "math_score"]]


#school_9th_df.head(5) #testing variable

school9_mgrp = school9th_mdf.groupby(["school_name"])
school10_mgrp = school10th_mdf.groupby(["school_name"])
school11_mgrp = school11th_mdf.groupby(["school_name"])
school12_mgrp = school12th_mdf.groupby(["school_name"])



# Create FOUR series for each GRADE 

school9_mgrp = school9_mgrp["math_score"].mean()
school10_mgrp = school10_mgrp["math_score"].mean()
school11_mgrp = school11_mgrp["math_score"].mean()
school12_mgrp = school12_mgrp["math_score"].mean()

# MERGE all four series into one data frame

mathdf_mergedGrade = pd.concat([school9_mgrp, school10_mgrp, school11_mgrp, school12_mgrp], axis = 1)

# Rename column name to reflect grade 
mathdf_mergedGrade.columns = ['9th', '10th', '11th', '12th' ]
mathdf_mergedGrade


######################################################################################
This here is where I performed the below actions: 				     #
				     						     #
Reading Score by Grade								     #
Perform the same operations as above for reading scores				     #
######################################################################################

#READING  CODE:  THIS code identifies by grade READING scores and creates series elements and combines them into signle data frame

schoolDataMerged.head() #testing variable   
school9th_rdf = schoolDataMerged.loc[( schoolDataMerged["grade"] == "9th" ) ] 
school10th_rdf = schoolDataMerged.loc[( schoolDataMerged["grade"] == "10th" ) ] 
school11th_rdf = schoolDataMerged.loc[( schoolDataMerged["grade"] == "11th" ) ] 
school12th_rdf = schoolDataMerged.loc[( schoolDataMerged["grade"] == "12th" ) ] 


school9th_rdf = school9th_rdf[["school_name", "grade", "reading_score"]]
school10th_rdf = school10th_rdf[["school_name", "grade", "reading_score"]]
school11th_rdf = school11th_rdf[["school_name", "grade", "reading_score"]]
school12th_rdf = school12th_rdf[["school_name", "grade", "reading_score"]]


#school9th_rdf.head(5) #testing variable

school9_rgrp = school9th_rdf.groupby(["school_name"])
school10_rgrp = school10th_rdf.groupby(["school_name"])
school11_rgrp = school11th_rdf.groupby(["school_name"])
school12_rgrp = school12th_rdf.groupby(["school_name"])



# Create FOUR series for each GRADE 

school9_rgrp   = school9_rgrp["reading_score"].mean()
school10_rgrp  = school10_rgrp["reading_score"].mean()
school11_rgrp  = school11_rgrp["reading_score"].mean()
school12_rgrp  = school12_rgrp["reading_score"].mean()

# MERGE all four series into one data frame

readingdf_mergedGrade = pd.concat([school9_rgrp, school10_rgrp, school11_rgrp, school12_rgrp], axis = 1)

# Rename column name to reflect grade 
readingdf_mergedGrade.columns = ['9th', '10th', '11th', '12th' ]
readingdf_mergedGrade


######################################################################################
This here is where I performed the below actions: 				     #
				     						     #
Scores by School Spending							     #
Create a table that breaks down school performances based on average Spending Ranges #
(Per Student). Use 4 reasonable bins to group school spending.			     #
Include in the table each of the following:					     #
Average Math Score								     #
Average Reading Score								     #
% Passing Math									     #
% Passing Reading								     #
Overall Passing Rate (Average of the above two)			    		     #
######################################################################################

binslist = [0,586,631,646,680]

# Create names for four BINS
group_labels = ["<$585","$585-630","$630-645", "$645-680"]


schoolSum = merge_df["Spending Ranges (Per Student)"] = pd.cut(merge_df["Per Student Budget"], binslist, labels=group_labels,include_lowest=True)

schoolSum_df = merge_df.groupby(schoolSum).mean()

schoolSum_df = schoolSum_df[['AverageMathScore','AverageReadingScore','%PassMath','%PassReading','%OvearllPass']]

schoolSum_df.AverageMathScore = schoolSum_df.AverageMathScore.astype(float)
schoolSum_df.AverageMathScore = schoolSum_df.AverageMathScore.map(" {:.2f}".format)

#print(schoolSum_df.AverageMathScore) #testing variable
schoolSum_df.head() #testing variable

schoolSum_df.AverageReadingScore = schoolSum_df.AverageReadingScore.astype(float)
schoolSum_df.AverageReadingScore = schoolSum_df.AverageReadingScore.map(" {:.2f}".format)

schoolSum_df.head() #testing variable


######################################################################################
This here is where I performed the below actions: 				     #
				     						     #
Scores by School Size								     #
Perform the same operations as above, based on school size.			     #
######################################################################################

# This LOGIC below GROUPS schools based on the sizes(& Bins below) and displays average scores in MATH and READING
binsList = [0,1000,2000,5001]

# Create names for THREE  BINS based on school size 
labelSizes = ["Small (<1000)","Medium (1000-2000)","Large (2000-5000)"]
merge_df["School Size"] = pd.cut(merge_df["School Size"], binsList, labels=labelSizes, include_lowest=True)

schoolSize_df = merge_df.groupby("School Size").mean()

schoolSize_df.columns
schoolSize_df = schoolSize_df[[ 'AverageMathScore','AverageReadingScore','%PassMath','%PassReading','%OvearllPass']]
schoolSize_df.head() #testing variable


######################################################################################
This here is where I performed the below actions: 				     #
				     						     #
Scores by School Type								     #
Perform the same operations as above, based on school type			     #
######################################################################################

#Below displays Average Scores by School Type 

#Created School Type Data Frame (Charter, District) and grouped the data 

schoolType_df = merge_df[["School Type", "AverageMathScore", "AverageReadingScore",  "%PassMath", "%PassReading", "%OvearllPass"]]

schoolType_df = schoolType_df.set_index('School Type')

schoolType_df = schoolType_df.groupby('School Type')
schoolType_df.mean() #testing variable
