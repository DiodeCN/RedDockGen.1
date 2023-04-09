// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// set color based on password strength
export const strengthColor = (count) => {
    if (count < 2) return { label: '你的密码太垃圾了', color: 'error.main' };
    if (count < 3) return { label: '你的密码现在就和1991年的苏联一样坚固', color: 'warning.main' };
    if (count < 4) return { label: '你的密码提升空间极大', color: 'warning.dark' };
    if (count < 5) return { label: '你的密码，就和对准约翰·F·肯尼迪的猎枪一样准确', color: 'success.main' };
    if (count < 6) return { label: '你的密码，如凯撒大帝照耀本网站', color: 'success.dark' };
    return { label: 'Poor', color: 'error.main' };
};

// password strength indicator
export const strengthIndicator = (number) => {
    let strengths = 0;
    if (number.length > 5) strengths += 1;
    if (number.length > 7) strengths += 1;
    if (hasNumber(number)) strengths += 1;
    if (hasSpecial(number)) strengths += 1;
    if (hasMixed(number)) strengths += 1;
    return strengths;
};
