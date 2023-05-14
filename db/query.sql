SELECT department.department_name AS department, role.salary
FROM role
LEFT JOIN department
ON role.department_id = department.id
ORDER BY department.department_name;
