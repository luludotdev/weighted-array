import { WeightedMap } from '../src'

export const checkValue = (expected: number, actual: number, margin: number) =>
  Math.abs(actual - expected) / expected < margin

export const testMap1: WeightedMap<string> = new Map().set('A', 1).set('B', 3)
export const testMap2: WeightedMap<string> = new Map()
  .set('A', 1)
  .set('B', 2)
  .set('C', 3)
