// Fake client-side login. Do not use this approach for real authentication.
const DEMO_EMAIL = import.meta.env.VITE_STUDENT_EMAIL || 'student@example.com';

export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username.trim().toLowerCase() === DEMO_EMAIL.trim().toLowerCase() && password === 'demo123456') {
        resolve({ username: DEMO_EMAIL });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
}
