import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeScore(score: number) {
  try {
    await AsyncStorage.setItem('@score', String(score));
  } catch (e) {
    console.log(e, 'saving error');
  }
}

export async function getScore() {
  try {
    const value = await AsyncStorage.getItem('@score');
    return value !== null ? parseInt(value) : 0;
  } catch (e) {
    console.log(e, 'getting error');
    return 0;
  }
}

export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isCollide(a: any, b: any) {
  return !(
    a.position[1] + a.height < b.position[1] ||
    a.position[1] > b.position[1] + b.height ||
    a.position[0] + a.width < b.position[0] ||
    a.position[0] > b.position[0] + b.width
  );
}
