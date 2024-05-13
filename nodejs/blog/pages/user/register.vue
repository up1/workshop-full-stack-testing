<template>
  <div>
    <Head>
      <title>Sign up</title>
    </Head>

    <MyContainer>
      <div class="w-full md:w-1/2 md:mx-auto">
        <h1 class="text-center text-4xl font-medium mb-2">Sign up</h1>
        <p class="text-center mb-6">
          <NuxtLink
            href="/user/login"
            class="text-custom-green no-underline hover:text-green-600 hover:underline"
          >
            Have an account?
          </NuxtLink>
        </p>
        <SignUpForm />
      </div>
      <div class="my-4"></div>
    </MyContainer>
  </div>
</template>