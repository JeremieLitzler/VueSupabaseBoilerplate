// to internationlize the faked data, use the XX_ZZ local
// and import fake like the comment below
// import { fakerFR_BE as faker } from '@faker-js/faker'
import { faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

console.log('import.meta.env', import.meta.env)
console.log('process.env', process.env)
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_PROJECT_SERVICE_ROLE

// console.log('supabaseUrl', supabaseUrl)
// console.log('supabaseKey', supabaseKey)
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_PROJECT_SERVICE_ROLE,
)

const testingUserEmail = process.env.TESTING_USER_EMAIL
if (!testingUserEmail) {
  console.error('Have you forgot to add TESTING_USER_EMAIL to your .env file?')
  process.exit()
}

const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`,
  )
  process.exit(1)
}

const logStep = (stepMessage) => {
  console.log(stepMessage)
}

const PrimaryTestUserExists = async () => {
  logStep('Checking if primary test user exists...')
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username')
    .eq('username', 'testaccount1')
    .single()

  if (error) {
    console.log('Primary test user not found. Will create one.')
    return false
  }

  logStep('Primary test user is found.')
  return data?.id
}

const createPrimaryTestUser = async () => {
  logStep('Creating primary test user...')
  const dummyData = {
    firstName: 'Test',
    lastName: 'Account',
    userName: 'testaccount1',
    email: testingUserEmail,
    userId: null,
  }
  const { data, error } = await supabase.auth.signUp({
    email: dummyData.email,
    password: dummyData.email,
    options: {
      data: {
        first_name: dummyData.firstName,
        last_name: dummyData.lastName,
        full_name: dummyData.firstName + ' ' + dummyData.lastName,
        username: dummyData.userName,
      },
    },
  })

  if (error) {
    logErrorAndExit('Users', error)
  }

  if (data) {
    dummyData.userId = data.user.id
    await seedProfiles(dummyData)
    return userId
  }
}
const seedProfiles = async ({ userId, firstName, lastName, userName }) => {
  await supabase.from('profiles').insert({
    id: userId,
    full_name: firstName + ' ' + lastName,
    username: userName,
    bio: 'The main testing account',
    avatar_url: `https://i.pravatar.cc/150?u=${userId}`,
  })

  logStep(`Primary test user <${userId}> created successfully.`)
}
const seedDatabase = async (numEntriesPerTable) => {
  let userId

  const testUserId = await PrimaryTestUserExists()

  if (!testUserId) {
    const primaryTestUserId = await createPrimaryTestUser()
    userId = primaryTestUserId
  } else {
    userId = testUserId
  }
}

const numEntriesPerTable = 10

seedDatabase(numEntriesPerTable)
