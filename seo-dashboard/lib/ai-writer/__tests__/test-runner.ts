/**
 * Minimal test runner for bug exploration tests
 * 
 * Provides describe/it/expect syntax without requiring a full test framework
 */

type TestFn = () => void | Promise<void>;

interface TestCase {
  description: string;
  fn: TestFn;
}

interface TestSuite {
  description: string;
  tests: TestCase[];
  suites: TestSuite[];
}

const rootSuites: TestSuite[] = [];
let currentSuite: TestSuite | null = null;

export function describe(description: string, fn: () => void) {
  const parentSuite = currentSuite;
  const suite: TestSuite = {
    description,
    tests: [],
    suites: [],
  };

  if (parentSuite) {
    parentSuite.suites.push(suite);
  } else {
    rootSuites.push(suite);
  }

  currentSuite = suite;
  fn();
  currentSuite = parentSuite;
}

export function it(description: string, fn: TestFn) {
  if (!currentSuite) {
    throw new Error("it() must be called inside describe()");
  }

  currentSuite.tests.push({ description, fn });
}

export const expect = (actual: any) => ({
  toBe(expected: any) {
    if (actual !== expected) {
      throw new Error(`Expected ${JSON.stringify(expected)}, but got ${JSON.stringify(actual)}`);
    }
  },
  toBeDefined() {
    if (actual === undefined) {
      throw new Error(`Expected value to be defined, but got undefined`);
    }
  },
  toMatch(pattern: RegExp) {
    if (!pattern.test(String(actual))) {
      throw new Error(`Expected "${actual}" to match ${pattern}`);
    }
  },
  toBeGreaterThan(expected: number) {
    if (typeof actual !== 'number' || typeof expected !== 'number') {
      throw new Error(`Expected both values to be numbers`);
    }
    if (actual <= expected) {
      throw new Error(`Expected ${actual} to be greater than ${expected}`);
    }
  },
});

async function runTest(test: TestCase, suitePath: string): Promise<boolean> {
  const fullPath = `${suitePath} > ${test.description}`;
  
  try {
    await test.fn();
    console.log(`  ✅ ${test.description}`);
    return true;
  } catch (error) {
    console.log(`  ❌ ${test.description}`);
    console.log(`     Error: ${(error as Error).message}`);
    return false;
  }
}

async function runSuite(suite: TestSuite, indent: string = ""): Promise<{ passed: number; failed: number }> {
  console.log(`${indent}${suite.description}`);
  
  let passed = 0;
  let failed = 0;

  // Run tests in this suite
  for (const test of suite.tests) {
    const success = await runTest(test, suite.description);
    if (success) {
      passed++;
    } else {
      failed++;
    }
  }

  // Run nested suites
  for (const nestedSuite of suite.suites) {
    const results = await runSuite(nestedSuite, indent + "  ");
    passed += results.passed;
    failed += results.failed;
  }

  return { passed, failed };
}

export async function runAllTests() {
  console.log("\n🧪 Running Tests\n");
  
  let totalPassed = 0;
  let totalFailed = 0;

  for (const suite of rootSuites) {
    const results = await runSuite(suite);
    totalPassed += results.passed;
    totalFailed += results.failed;
  }

  console.log("\n" + "=".repeat(50));
  console.log(`\nResults: ${totalPassed} passed, ${totalFailed} failed\n`);

  return totalFailed === 0;
}

// Make functions global for test files
(global as any).describe = describe;
(global as any).it = it;
(global as any).expect = expect;
