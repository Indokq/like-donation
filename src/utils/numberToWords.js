const ones = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];
const teens = ['Sepuluh', 'Sebelas', 'Dua Belas', 'Tiga Belas', 'Empat Belas', 'Lima Belas', 'Enam Belas', 'Tujuh Belas', 'Delapan Belas', 'Sembilan Belas'];
const tens = ['', '', 'Dua Puluh', 'Tiga Puluh', 'Empat Puluh', 'Lima Puluh', 'Enam Puluh', 'Tujuh Puluh', 'Delapan Puluh', 'Sembilan Puluh'];

function convertHundreds(num) {
  let result = '';
  
  const hundred = Math.floor(num / 100);
  const remainder = num % 100;
  
  if (hundred > 0) {
    if (hundred === 1) {
      result += 'Seratus ';
    } else {
      result += ones[hundred] + ' Ratus ';
    }
  }
  
  if (remainder >= 10 && remainder < 20) {
    result += teens[remainder - 10];
  } else {
    const ten = Math.floor(remainder / 10);
    const one = remainder % 10;
    
    if (ten > 0) {
      result += tens[ten] + ' ';
    }
    
    if (one > 0) {
      result += ones[one];
    }
  }
  
  return result.trim();
}

export function numberToWords(num) {
  if (num === 0) return 'Nol Rupiah';
  if (num < 0) return 'Minus ' + numberToWords(Math.abs(num));
  
  let result = '';
  
  // Billions (Miliar)
  const billion = Math.floor(num / 1000000000);
  if (billion > 0) {
    result += convertHundreds(billion) + ' Miliar ';
    num %= 1000000000;
  }
  
  // Millions (Juta)
  const million = Math.floor(num / 1000000);
  if (million > 0) {
    result += convertHundreds(million) + ' Juta ';
    num %= 1000000;
  }
  
  // Thousands (Ribu)
  const thousand = Math.floor(num / 1000);
  if (thousand > 0) {
    if (thousand === 1) {
      result += 'Seribu ';
    } else {
      result += convertHundreds(thousand) + ' Ribu ';
    }
    num %= 1000;
  }
  
  // Hundreds
  if (num > 0) {
    result += convertHundreds(num) + ' ';
  }
  
  result = result.trim() + ' Rupiah';
  return result;
}
