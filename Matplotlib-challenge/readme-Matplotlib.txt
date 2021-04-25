# Matplotlib challenge


# Dependencies and Setup
import matplotlib.pyplot as plt
import pandas as pd
import scipy.stats as st
import numpy as np
from scipy.stats import sem
from scipy.stats import linregress


# Study data files
mouseDatapath = "data/Mouse_metadata.csv"
studyDatapath = "data/Study_results.csv"

# Read the mouse data and the study results
mouseData = pd.read_csv(mouseDatapath)
studyData = pd.read_csv(studyDatapath)


#Display records of mouse metadata
mouseData.head()
#Display records of study results 
studyData.head()
 
# Combine the data into a single dataset

studyComplete = pd.merge(mouseData, studyData, how="left", on=["Mouse ID", "Mouse ID"])

# Display the data table for preview

studyComplete.head(30)

# Checking the number of mice.
studyComplete['Mouse ID'].count()

# Identify duplicate records in the dataset

dupMice_df = studyComplete[studyComplete.duplicated(subset = ["Mouse ID", "Timepoint"])]
dupMice_df                                                                    

# Create a clean DataFrame by dropping the duplicate mouse by its ID.
noDupMice_DF = studyComplete.drop_duplicates(subset = ["Mouse ID", "Timepoint"])
noDupMice_DF.columns = ['MouseId', 'DrugRegimen', 'Sex', 'AgeMonths', 'Weight', 'Timepoint', 'TumorVolume', 'MetaStaticSites']
# Testing variable
noDupMice_DF['MouseId'].count()


#Generate a summary statistics table of mean, median, variance, standard deviation, and SEM of the tumor volume for each regimen
# Use groupby and summary statistical methods to calculate the following properties of each drug regimen: 
# mean, median, variance, standard deviation, and SEM of the tumor volume. 
# Assemble the resulting series into a single summary dataframe.


#Generating stats and values for Summary Table
mouseDrug_gp = noDupMice_DF.groupby("DrugRegimen")
mouseCount = mouseDrug_gp["DrugRegimen"].count()
mouseMean = mouseDrug_gp["TumorVolume"].mean()
mouseMed = mouseDrug_gp["TumorVolume"].median()
mouseStd = mouseDrug_gp["TumorVolume"].std()
mouseVar = mouseDrug_gp["TumorVolume"].var()
mouseSem = mouseDrug_gp["TumorVolume"].sem()

data = { 
    'Count' : mouseCount,
    'Mean' : mouseMean,
    'Median' : mouseMed,
    'Standard_Deviation' : mouseStd,
    'Variance' : mouseVar,
    'SEM' : mouseSem
    } 
miceStats_df = pd.DataFrame(data)

miceStats_df.head()

# Generate a summary statistics table of mean, median, variance, standard deviation, and SEM of the tumor volume for each regimen

# Using the aggregation method, produce the same summary statistics in a single line
mouseDrug_gp.aggregate({"TumorVolume":['count', 'mean', 'median', 'sem' , 'std' , 'var']})

# Generate a bar plot showing the total number of measurements taken on each drug regimen using PANDAS

# m_count --> This variable has total number of mesurements for each of Drug Regimen 

# Isn't this BEAUTIFUL ????? 

# Create a bar chart based off of the group series from before
cChart = mouseCount.plot(kind='bar')

# Set the xlabel and ylabel using class methods
cChart.set_xlabel("Drug Names")
cChart.set_ylabel("Total Measurements")

plt.show()
plt.tight_layout() #Setting tight orientation

# Generate a bar plot showing the total number of measurements taken on each drug regimen using PYPLOT

xAxis  = noDupMice_DF["DrugRegimen"].unique()
yAxis =  noDupMice_DF["DrugRegimen"].count()
colors = ("green", "lightblue", "yellow") #Setting colors series

plt.bar(xAxis, mouseCount, color=colors)

plt.xticks(rotation=90)
plt.tight_layout() #Setting tight orientation

plt.title("Total Measurements for Drugs")
plt.xlabel("Drug Names")
plt.ylabel("Total Measurements")

# Generate a pie plot showing the distribution of female versus male mice using PANDAS

sex = noDupMice_DF["Sex"].unique()
data = noDupMice_DF["Sex"].value_counts()

data.plot(kind='pie', autopct='%1.1f%%')

#Make axis off
plt.axis('off')

#Generate a pie plot showing the distribution of female versus male mice using PY PLOT

plt.pie(data, labels=sex, autopct='%1.1f%%', shadow=True, startangle=170)

#Make axis off
plt.axis('off')

# Put treatments into a list for for loop (and later for plot labels)

Drugs = ["Ramicane", "Capomulin" , "Infubinol", "Ceftamin"]

miceDrugs = noDupMice_DF[noDupMice_DF.DrugRegimen.isin(Drugs)]
miceDrugs_gp = miceDrugs.groupby(['MouseId', 'DrugRegimen']).max()  # Gets max record for Timepoint for each mouse
#miceDrugs_df = miceDrugs_gp
miceDrugs_df = miceDrugs.groupby(['MouseId']).max()
#miceDrugs_df = miceDrugs_df.clear(['MouseId'])
#miceDrugs_df.reset_index(drop=True, inplace=True)
#miceDrugs_gp.head(30)
miceDrugs_df.head(30)
#print(miceDrugs_df.index[3])
#miceDrugs_df

miceDrugs_gp_maxtp = miceDrugs_gp.rename(columns = {'Timepoint' : 'MaxTimePoint'})

maxtp_df = pd.DataFrame(noDupMice_DF.groupby('MouseId')['Timepoint'].max().sort_values()).reset_index().rename(columns={'Timepoint': 'MaxTimepoint'})
maxtp_df

mergedtp_df = pd.merge(noDupMice_DF, maxtp_df, on='MouseId')
mergedtp_df.head()

# Create empty list to fill with tumor vol data (for plotting)
drugData = []

for drug in drugData:
    
    tempd_df = mergedtp_df.loc[mergedtp_df['DrugRegimen'] == drug]

    finalvolume_df = tempd_df.loc[temp_df['Timepoint'] == tempd_df['MaxTimepoint']]
    
    values = finalvolume_df['TumorVolume']
    Drug_data.append(values)
    
    quartiles = values.quantile([.25,.5,.75])
    lowerq = quartiles[0.25]
    upperq = quartiles[0.75]
    iqr = upperq-lowerq
    
    print(drug +  ": 1st Quartile==>" +  str(lowerq))
    print(drug +  ": 3rd Quartile==>" + str(upperq))
    print(drug +  ": IQR==>" + str(iqr))
    
  
    lower_bound = lowerq - (1.5*iqr)
    upper_bound = upperq + (1.5*iqr)

    outliers_count = (values.loc[(final_volume_df['TumorVolume'] >= upper_bound) | (finalvolume_df['TumorVolume'] <= lower_bound)]).count()
    
    print(drug + ": Outlier Count==>" + str(outliers_count))
    print(drug +  ":Lower Bound ==>" +  str(lower_bound))
    print(drug +  ": Upper Bound==>" + str(upper_bound))

# Generate a box plot of the final tumor volume of each mouse across four regimens of interest

Marker= dict(marker='o', markerfacecolor='r', markersize=10, markeredgecolor='blue')

plt.boxplot(drugData, flierprops=Marker)


plt.title('Tumor Volume by Drug')
plt.ylabel('Final Tumor Volume  ')
plt.xticks([1, 2, 3, 4], ['Capomulin', 'Ramicane', 'Infubinol', 'Ceftamin'])

plt.show()

# Generate a line plot of tumor volume vs. time point for a mouse treated with Capomulin
Capomulin_df = []

Capomulin_df = noDupMice_DF.loc[noDupMice_DF['DrugRegimen'] == 'Capomulin']

s185 = Capomulin_df.loc[Capomulin_df['MouseId'] == 's185']

plt.plot(s185['Timepoint'], s185['TumorVolume'], marker = 'x')

# Add labels and title to plot
plt.xlabel("Time Point ")
plt.ylabel("Tumor Volume ")
plt.title("Capomulin Treatment for mouse:" + "s185")

# Display plot
plt.show()


# Generate a scatter plot of average tumor volume vs. mouse weight for the Capomulin regimen
avgvol_df = pd.DataFrame(Capomulin_df.groupby('MouseId')['TumorVolume'].mean().sort_values()).reset_index().rename(columns={'TumorVolume': 'AvgTumorVol'})

avgvol_df = pd.merge(Capomulin_df, avgvol_df, on='MouseId')
final_avgvol_df = avgvol_df[['Weight', 'AvgTumorVol']].drop_duplicates()
final_avgvol_df

x = final_avgvol_df['Weight']
y = final_avgvol_df['AvgTumorVol']

plt.scatter(x, y)

# Add labels and title to plot
plt.xlabel("Weight ")
plt.ylabel("Average Tumor Volume ")
plt.title('Average Tumor Volume by Weight')
plt.show()

# Calculate the correlation coefficient and linear regression model 
# for mouse weight and average tumor volume for the Capomulin regimen
# Calculate the correlation coefficient and linear regression model 
# for mouse weight and average tumor volume for the Capomulin regimen
avgvol_df = pd.DataFrame(Capomulin_df.groupby('MouseId')['TumorVolume'].mean().sort_values()).reset_index().rename(columns={'TumorVolume': 'AvgTumorVol'})
avgvol_df = pd.merge(Capomulin_df, avgvol_df, on='MouseId')
final_avgvol_df = avgvol_df[['Weight', 'AvgTumorVol']].drop_duplicates()
final_avgvol_df
x = final_avgvol_df['Weight']
y = final_avgvol_df['AvgTumorVol']

correlation = st.pearsonr(x,y)

(slope, intercept, rvalue, pvalue, stderr) = linregress(x, y)
regress_values = x * slope + intercept
line_eq = "y = " + str(round(slope,2)) + "x + " + str(round(intercept,2))


plt.scatter(x,y)
plt.plot(x,regress_values,"r-")
plt.annotate(line_eq,(20,35),fontsize=12,color="red")
plt.xlabel("Weight")
plt.ylabel("Average Tumor Volume")
plt.title("Average Tumor Volume by Weight")
plt.show()
