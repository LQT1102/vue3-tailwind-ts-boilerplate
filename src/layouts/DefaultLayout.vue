<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "DefaultLayout",
});
</script>

<template>
    <v-layout>
        <v-main>
          <h1 class="text-teal-500">From Default layout</h1>
          <!--The <slot> element is a slot outlet that indicates 
                where the "VIEW" content should be rendered.-->
            <slot></slot>
        </v-main>
    </v-layout>
</template>