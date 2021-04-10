# SQL Challenge

################################################################
#Please find the QuickDBD export listed as QuickDBD-export.sql.#
################################################################
############################################################################################
#Please reference the images folder and reference sqlERD-diagram for ERD generated diagram.#
############################################################################################


##################################
#This here is the Table creation.#
##################################

CREATE TABLE "departments" (
    "dept_num" varchar   NOT NULL,
    "dept_name" varchar   NOT NULL,
    CONSTRAINT "pk_departments" PRIMARY KEY (
        "dept_num"
     )
);

CREATE TABLE "employees" (
    "employee_num" INT   NOT NULL,
    "emp_title_id" varchar   NOT NULL,
    "birth_date" date   NOT NULL,
    "first_nane" varchar   NOT NULL,
    "last_name" varchar   NOT NULL,
    "sex" varchar   NOT NULL,
    "hire_date" date   NOT NULL,
    CONSTRAINT "pk_employees" PRIMARY KEY (
        "employee_num","emp_title_id"
     )
);

CREATE TABLE "dept_manager" (
    "dept_number" varchar   NOT NULL,
    "emp_no" INT   NOT NULL
);

CREATE TABLE "salaries" (
    "emp_number" INT   NOT NULL,
    "salary" INT   NOT NULL
);

CREATE TABLE "titles" (
    "title_id" varchar   NOT NULL,
    "title" varchar   NOT NULL
);

CREATE TABLE "dept_emp" (
    "emp_num" INT   NOT NULL,
    "dept_no" varchar   NOT NULL
);

###########################################
#This here is where I added my contraints.#
###########################################

#################################################
#ADD DATA TO TABLES PRIOR TO ADDING CONSTRAINTS.#
#################################################

ALTER TABLE "dept_manager" ADD CONSTRAINT "fk_dept_manager_dept_number" FOREIGN KEY("dept_number")
REFERENCES "departments" ("dept_num");

--===========================================================================
-- Adding Unique constraints
===========================================================================
##Run these BEFORE any other contraints for the employees table
===========================================================================
ALTER TABLE "employees" ADD CONSTRAINT "uk_employees_emp_no" UNIQUE("emp_no")

ALTER TABLE "employees" ADD CONSTRAINT "uk_employees_emp_title_id" UNIQUE("emp_title_id")
--===========================================================================

ALTER TABLE "dept_manager" ADD CONSTRAINT "fk_dept_manager_emp_no" FOREIGN KEY("emp_no")
REFERENCES "employees" ("employee_num");

ALTER TABLE "salaries" ADD CONSTRAINT "fk_salaries_emp_number" FOREIGN KEY("emp_number")
REFERENCES "employees" ("employee_num");

ALTER TABLE "titles" ADD CONSTRAINT "fk_titles_title" FOREIGN KEY("title")
REFERENCES "employees" ("emp_title_id");

ALTER TABLE "dept_emp" ADD CONSTRAINT "fk_dept_emp_emp_num" FOREIGN KEY("emp_num")
REFERENCES "employees" ("employee_num");

ALTER TABLE "dept_emp" ADD CONSTRAINT "fk_dept_emp_dept_no" FOREIGN KEY("dept_no")
REFERENCES "departments" ("dept_num");



#######################################################################
#This here is where I was testing the data and select in the database.#
#######################################################################

-- select * from departments
-- select * from employees
-- select * from salaries
-- select * from dept_manager
-- select * from titles

#######################################################################
#Below are the SQL queries listed by number followed by their answers.#
#######################################################################

-- 1. List the following details of each employee: employee number, last name, first name, sex, and salary.

--SELECT e.employee_num as Employee_Number, e.last_name as Last_Name, e.first_nane as First_Name, e.sex as Sex, s.salary as Salary

--FROM employees e , salaries s

--WHERE e.employee_num=s.emp_number;

###########################################################################################################
#Please reference the images folder and reference sqlQuery1 for proof of functionality of the above query.#
###########################################################################################################

-- 2. List first name, last name, and hire date for employees who were hired in 1986.

--SELECT e.first_nane as First_Name, e.last_name as Last_Name, e.hire_date as Hire_Date

--FROM employees e

--WHERE e.hire_date >= '1986-01-01' AND e.hire_date <=  '1986-12-31';

###########################################################################################################
#Please reference the images folder and reference sqlQuery2 for proof of functionality of the above query.#
###########################################################################################################

-- 3. List the manager of each department with the following information: department number, department name, the manager's employee number, last name, first name.

--#################
-- Example subquery

--SELECT <list_of_column_names> 

--FROM <table_name> 

--WHERE <column_name> = (SELECT <column_name> FROM <table_name> WHERE <condition> );
--#################

--SELECT d.dept_num as Department_Number, d.dept_name as Department_Name, e.employee_num as Employee_Number, e.last_name as Last_Name, e.first_nane as Fast_Name
--FROM employees e, dept_manager m, departments d
--WHERE e.employee_num = m.emp_no and m.dept_number = d.dept_num;

###########################################################################################################
#Please reference the images folder and reference sqlQuery3 for proof of functionality of the above query.#
###########################################################################################################	
	
-- 4. List the department of each employee with the following information: employee number, last name, first name, and department name.

--SELECT e.employee_num as Employee_Number, e.last_name as Last_Name, e.first_nane as Fast_Name, d.dept_name as Department_Name
--FROM employees e, dept_manager m, departments d
--WHERE e.employee_num = m.emp_no and m.dept_number = d.dept_num;

###########################################################################################################
#Please reference the images folder and reference sqlQuery4 for proof of functionality of the above query.#
###########################################################################################################

-- 5. List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."

--SELECT e.first_nane as Fast_Name, e.last_name as Last_Name, e.sex as Sex
--FROM employees e
--WHERE e.first_nane = 'Hercules' and SUBSTRING(e.last_name, 1, 1 ) = 'B' 
--ORDER BY e.last_name;

###########################################################################################################
#Please reference the images folder and reference sqlQuery5 for proof of functionality of the above query.#
###########################################################################################################

-- 6. List all employees in the Sales department, including their employee number, last name, first name, and department name.

--SELECT e.employee_num as Employee_Number, e.last_name as Last_Name, e.first_nane as Fast_Name, d.dept_name as Department_Name
--FROM employees e, dept_manager m, departments d
--WHERE e.employee_num = m.emp_no and m.dept_number = d.dept_num and d.dept_name = 'Sales';

###########################################################################################################
#Please reference the images folder and reference sqlQuery6 for proof of functionality of the above query.#
###########################################################################################################

-- 7. List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.

--SELECT e.employee_num as Employee_Number, e.last_name as Last_Name, e.first_nane as Fast_Name, d.dept_name as Department_Name
--FROM employees e, dept_manager m, departments d
--WHERE e.employee_num = m.emp_no and m.dept_number = d.dept_num and (d.dept_name = 'Sales' or d.dept_name = 'Development');

###########################################################################################################
#Please reference the images folder and reference sqlQuery7 for proof of functionality of the above query.#
###########################################################################################################

-- 8. In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.

--SELECT e.last_name as Last_Name, COUNT(e.last_name) 
--FROM employees e
--GROUP BY e.last_name
--ORDER BY COUNT DESC

###########################################################################################################
#Please reference the images folder and reference sqlQuery8 for proof of functionality of the above query.#
###########################################################################################################

