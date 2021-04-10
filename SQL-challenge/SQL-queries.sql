-- select * from departments
-- select * from employees
-- select * from salaries
-- select * from dept_manager
-- select * from titles

-- 1. List the following details of each employee: employee number, last name, first name, sex, and salary.

--SELECT e.employee_num as Employee_Number, e.last_name as Last_Name, e.first_nane as First_Name, e.sex as Sex, s.salary as Salary

--FROM employees e , salaries s

--WHERE e.employee_num=s.emp_number;

-- 2. List first name, last name, and hire date for employees who were hired in 1986.

--SELECT e.first_nane as First_Name, e.last_name as Last_Name, e.hire_date as Hire_Date

--FROM employees e

--WHERE e.hire_date >= '1986-01-01' AND e.hire_date <=  '1986-12-31';

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
	
	
-- 4. List the department of each employee with the following information: employee number, last name, first name, and department name.

--SELECT e.employee_num as Employee_Number, e.last_name as Last_Name, e.first_nane as Fast_Name, d.dept_name as Department_Name
--FROM employees e, dept_manager m, departments d
--WHERE e.employee_num = m.emp_no and m.dept_number = d.dept_num;


-- 5. List first name, last name, and sex for employees whose first name is "Hercules" and last names begin with "B."

--SELECT e.first_nane as Fast_Name, e.last_name as Last_Name, e.sex as Sex
--FROM employees e
--WHERE e.first_nane = 'Hercules' and SUBSTRING(e.last_name, 1, 1 ) = 'B' 
--ORDER BY e.last_name;

-- 6. List all employees in the Sales department, including their employee number, last name, first name, and department name.

--SELECT e.employee_num as Employee_Number, e.last_name as Last_Name, e.first_nane as Fast_Name, d.dept_name as Department_Name
--FROM employees e, dept_manager m, departments d
--WHERE e.employee_num = m.emp_no and m.dept_number = d.dept_num and d.dept_name = 'Sales';

-- 7. List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name.

--SELECT e.employee_num as Employee_Number, e.last_name as Last_Name, e.first_nane as Fast_Name, d.dept_name as Department_Name
--FROM employees e, dept_manager m, departments d
--WHERE e.employee_num = m.emp_no and m.dept_number = d.dept_num and (d.dept_name = 'Sales' or d.dept_name = 'Development');

-- 8. In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.

--SELECT e.last_name as Last_Name, COUNT(e.last_name) 
--FROM employees e
--GROUP BY e.last_name
--ORDER BY COUNT DESC