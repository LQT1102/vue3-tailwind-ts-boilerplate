<script setup lang="ts">
import useTranslation from "@/hooks/common/useTranslation";
import SvgComponent from "../assets/icons/test.svg";
import * as yup from 'yup';
import { Form, useForm } from "vee-validate";

const t = useTranslation();
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  remember: yup.bool()
});

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
    password: "",
    remember: false
  }
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [remember, rememberAttrs] = defineField('remember');

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<template>
  <div class="home flex flex-col items-center">
      <h2>Svg as Component</h2>
      <div class="w-5 h-5 text-center"><SvgComponent /></div>
    <h1 class="text-2xl">This is an home page</h1>
    <h2>{{ t("messWithParam", ["World"]) }}</h2>
    <h3>I18n nested content {{ t("content.nested") }}</h3>

    <h2 class="mt-10">Form State vee-validate</h2>
    <form @submit="onSubmit">
    <div class="flex flex-col">
      <input class="input input-bordered" v-model="email" v-bind="emailAttrs" name="email" type="email" />
    <span class="text-red-500">{{ errors.email }}</span>

    <input class="input input-bordered" v-model="password" v-bind="passwordAttrs" name="password" type="password" />
    <span class="text-red-500">{{ errors.password }}</span>

    <label className="label cursor-pointer">
    <span className="label-text">Remember me</span> 
    <input name="remember" v-bind="rememberAttrs" v-model="remember" type="checkbox" className="checkbox" />
  </label>
    </div>

    <button>Submit</button>
  </form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
