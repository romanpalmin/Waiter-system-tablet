import md5 from 'md5';

function md5hash(str) {
    return md5(str);
}

// 'test' => '09$8f$6b$cd$46$21$d3$73$ca$de$4e$83$26$27$b4$f6'
export default function (str) {
    return ((md5hash(str).split('')).map(function (item, index, arr) {
        return ((index + 1) % 2 === 0 && index < arr.length - 1)
            ? item + '$'
            : item
    }))
        .join('');
}