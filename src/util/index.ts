export function getCurrentDateTime(): string {
    const now = new Date();
  
    // 년, 월, 일, 시, 분, 초를 가져옴
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    // 포맷된 날짜 및 시간 문자열 반환
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

