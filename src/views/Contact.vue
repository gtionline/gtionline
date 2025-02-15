<template>
  <div class="about pageContainer">
    <h3 class="title">
      {{ $t("contact") }}
    </h3>
    <div class="bodyContainer">
      <h2>{{ $t('contactPersonHeader') }}</h2>
      <p><span class="icon"><font-awesome-icon icon="envelope" /></span> <span class="info"><a>cs12-gti@fau.de</a></span></p>

      <h2>{{ $t('Danksagung') }}</h2>
      <p>{{ $t('thankProfessorTeich') }}</p>
      <p>{{ $t('weThank') }}</p><p>Daniel Seidel, Timo Teufel{{ $t('and') }} Martin Zeus</p>

      <!--<h2>{{$t('impressum')}}</h2>
      <p>{{$t('impressumText')}}</p><a href="https://www.cs12.tf.fau.de/impressum/">https://www.cs12.tf.fau.de/impressum/</a>
       <h2>{{$t('representedByHeader')}}</h2>
      <p class="info">{{$t('representedBy')}}</p>

      <h2>{{$t('contactPersonHeader')}}</h2>
      <p><span class="icon"><font-awesome-icon icon="user-friends"/></span>
        <span class="info">Marcel Brand, Christian Heidorn, Jan Spieck, Michael Witterauf</span>
      </p>
      <p><span class="icon"><font-awesome-icon icon="envelope"/></span>
        <span class="info"><a>cs12-gti@fau.de</a></span></p>
      <h2>{{$t('haftungsauschlussHeader')}}</h2>
      <p class="info">{{$t('haftungsauschlussBody')}}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',
};
</script>

<style>
  .title {
    text-align: center;
  }
  .about {
    text-align: left !important;
  }
  .info {
    font-size: 18px;
  }
  .icon {
    display: inline-block;
    width: 20px;
    margin-right: 10px;
    color: #0d336f;
  }
</style>
