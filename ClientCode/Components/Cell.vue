<template>
  <div class="boardCell"></div>
</template>

<script>
export default {
    props: [
        'size'
    ]
}
</script>


<style lang="scss" scoped>
// .boardCell {
//   display: flex;
//   justify-content: center;
//   align-items: stretch;
//   border: 1px #222222 solid;
//   width: 20px;
//   height: 20px;

//     &:before {
//       content: "";
//       display: table;
//       padding-top: 100%;
//     }
//     &.color-land {
//       background-color: #03b363;
    // }
  //   &.color-land-darken {
  //     background-color: darken(
  //       $color: (
  //         #03b363
  //       ),
  //       $amount: 10
  //     );
  //   }
  //   &.color-sea {
  //     background-color: #006694;
  //   }
  //   &.color-island {
  //     background-color: #ede064;
  //   }
  //   &.color-selection {
  //     background-color: red;
  //   }
  //   &.color-in-range {
  //     border: 1px white solid;
  //   }
// }
</style>