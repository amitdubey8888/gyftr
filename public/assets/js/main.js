var url = window.location.origin;

jQuery.fn.ForceNumericOnly = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.charCode || e.keyCode || 0;
            return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};

jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});

$.validator.addMethod("validName", function (value, element) {
    return /^[a-zA-Z\s]+$/.test(value);
}, "Please enter a valid name");

$.validator.addMethod("validMobile", function (value, element) {
    return /^((\\+91-?)|0)?[0-9]{10}$/.test(value);
}, "Please enter a valid mobile number");

$.validator.addMethod("validPinCode", function (value, element) {
    return /^((\\+91-?)|0)?[0-9]{6}$/.test(value);
}, "Please enter a valid pin code");

$.validator.addMethod("validEmail", function (value, element) {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}, "Please enter a valid email address");

$("#employee").submit(function (e) {
    e.preventDefault();
}).validate({
    rules: {
        salutation: {
            required: 1,
        },
        firstName: {
            required: 1,
            validName: 1
        },
        lastName: {
            required: 1,
            validName: 1
        },
        email: {
            required: 1,
            validEmail: 1
        },
        mobile: {
            required: 1,
            validMobile: 1
        },
        gender: {
            required: 1,
        },
        dob: {
            required: 1,
        },
        localAddress: {
            required: 1,
        },
        landmark: {
            required: 1,
        },
        city: {
            required: 1,
        },
        state: {
            required: 1,
        },
        pinCode: {
            required: 1,
            validPinCode: 1
        },
    },
    messages: {
        salutation: {
            required: 'Salutation is required',
        },
        firstName: {
            required: 'First name is required',
            validName: 'Please enter a valid name',
        },
        lastName: {
            required: 'Last name is required',
            validName: 'Please enter a valid name',
        },
        email: {
            required: 'Email is required',
            validEmail: "Please enter a valid email address"
        },
        mobile: {
            required: 'Mobile is required',
            validMobile: "Please enter a valid mobile number"
        },
        gender: {
            required: 'Gender is required',
        },
        dob: {
            required: 'DOB is required',
        },
        localAddress: {
            required: 'Local address is required',
        },
        landmark: {
            required: 'Landmark is required',
        },
        city: {
            required: 'City is required',
        },
        state: {
            required: 'State is required',
        },
        pinCode: {
            required: 'Pin code is required',
            validPinCode: "Please enter a valid pin code"
        },
    },
    submitHandler: function (form) {
        const employeeFormArr = $("#employee").serializeArray();
        var employeeFormData = {};
        for (i in employeeFormArr) { employeeFormData[employeeFormArr[i]['name']] = employeeFormArr[i]['value'] }
        $.ajax({
            type: 'POST',
            url: `${url}/api/employee/add`,
            data: employeeFormData,
            dataType: 'json',
            success: function (result) {
                alert(result.message);
                fetchEmployeeList();
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
});

function fetchEmployeeList() {
    $.ajax({
        type: 'POST',
        url: `${url}/api/employee/fetch`,
        data: {},
        dataType: 'json',
        success: function (result) {
            const employees = result.data;
            let tbody = '';
            let i = 1;
            employees.forEach((element) => {
                tbody = tbody + `
                <tr>
                    <td>${i}.</td>
                    <td>${element.salutation} ${element.firstName} ${element.lastName}</td>
                    <td>${element.email}</td>
                    <td>${element.mobile}</td>
                    <td>${element.gender}</td>
                    <td>${formatDate(new Date(element.dob), 'dd-mm-yyyy')}</td>
                    <td>${element.localAddress}, ${element.landmark}, ${element.city}, ${element.state} - ${element.pinCode}</td>
                </tr>
                `;
                i++;
            });
            $("#tbody").html(tbody);
        },
        error: function (error) {
            console.log(error);
        }
    });
}
function formatDate(value, format) {
    if (value) {
        const fullDate = new Date(value);
        const year = fullDate.getFullYear();
        const month = fullDate.getMonth() + 1 < 10 ? '0' + (fullDate.getMonth() + 1) : fullDate.getMonth() + 1;
        const date = fullDate.getDate() < 10 ? '0' + fullDate.getDate() : fullDate.getDate();
        if (format === 'dd-mm-yyyy') {
            return date + '-' + month + '-' + year;
        }
        if (format === 'mm-dd-yyyy') {
            return month + '-' + date + '-' + year;
        }
        if (format === 'dd/mm/yyyy') {
            return date + '/' + month + '/' + year;
        }
        if (format === 'mm/dd/yyyy') {
            return month + '/' + date + '/' + year;
        }
        if (format === 'yyyy-mm-dd') {
            return year + '-' + month + '-' + date;
        }
        if (format === 'yyyy-dd-mm') {
            return year + '-' + date + '-' + month;
        }
        if (format === 'yyyy/mm/dd') {
            return year + '/' + month + '/' + date;
        }
        if (format === 'yyyy/dd/mm') {
            return year + '/' + date + '/' + month;
        }
        return fullDate;
    } else {
        return null;
    }
}

window.onload = function (e) {
    fetchEmployeeList();
}
