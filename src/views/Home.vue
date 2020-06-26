<template>
  <div class="home">
    <h1>AirApp</h1>
    <p>
      Check the weather! Enter the city name, or
      <strong>
        leave empty for geolocation
      </strong>
    </p>
    <form>
      <input v-model="city" class="styledInput" />
      <button type="submit" class="styledSubmit">CHECK</button>
    </form>
    <detailsBox />
  </div>
</template>

<script>
// @ is an alias to /src
import detailsBox from "@/components/detailsBox";
export default {
  name: "Home",
  components: {
    detailsBox,
  },
};
</script>

<style scoped lang="scss">
$bg: rgba(169, 160, 160, 0.6);
.home {
  max-width: 400px;
}
p {
  color: #a9a0a0;

  strong {
    color: #fff;
  }
}
form {
  width: 100%;
  display: flex;
  height: 40px;
}
.styledInput {
  background: $bg;
  border: 1px solid rgb(214, 214, 214);
  box-shadow: none;
  color: #fff;
  height: calc(100% - 2px);
  padding: 0px 10px;
  flex: 1;
  outline: none;
  &:focus {
    outline: none;
  }
  max-height: 40px;
}

.styledSubmit {
  background: $bg;
  border: 1px solid rgb(214, 214, 214);
  height: 100%;
  margin-left: 10px;
  color: #fff;
  padding: 5px;
  flex: 1;
  font-weight: 700;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    background: #a9a9a9;
  }
}
</style>
