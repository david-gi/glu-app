<template>
    <div class="container-fluid">
    	<app-header id="Header" class="row"></app-header>
    	<div class="row vh-100" id="Home">
            <transition name="slide" mode="out-in" class="position-absolute">
                <router-view class=""></router-view>
            </transition>
            <place-vue class=""></place-vue>
            <profile-vue id="ProfileBox" class="position-absolute col col-sm-7 col-md-4 col-12"></profile-vue>
    	</div>
        <br>
    	<div class="row clearfix">
    	</div>
        <div class="row no-gutters">
            <div v-show="error" class="col-12 text-center text-white fixed-bottom error bg-danger">{{error}}</div>
        </div>
    </div>
</template>

<script>
	import {mapActions, mapGetters} from 'vuex'
	import Header from './components/Header.vue'
    import Profile from './components/Profile.vue'
    import Place from './components/Place.vue'
    export default {
        directives:{
            'focus': {
                inserted: function (el) {
                    el.focus()
                }
            }
        },
    	components: {
    		appHeader: Header,
			profileVue: Profile,
			placeVue: Place
        },
		computed: {
			...mapGetters([
				'loading',
				'msg',
			]),
			error(){
				return this.$store.state.error
			}
		},
		methods: {
			...mapActions([
				'setLoading',
			]),
		},
    	created() {
    	}
    }
</script>

<style>
	body {
		padding: 0;
	    font-family: Verdana, Geneva, Tahoma, sans-serif;
	}
    .glu-font{
        font-size: 1.1em;
        font-family: Georgia, 'Times New Roman', Times, serif !important;
    }
    #Header{
        padding: 0 24px;
    }
	#ProfileBox{
		right: 0;
	}
    #Home{
		padding-top: 42px;
        margin-bottom: -42px;
    }

    .error{
        padding:9px;
    }

    .slide-enter-active{
        animation: slide-in 200ms ease-out forwards;
    }
    .slide-leave-active{
        animation: slide-out 200ms ease-out forwards;
    }

    @keyframes slide-in {
        from{
            transform: translateY(-30px);
            opacity: 0;
        }
        to{
            transform: translateY(0);
            opacity: 1;
        }
    }
    @keyframes slide-out {
        from{
            transform: translateY(0);
            opacity: 1;
        }
        to{
            transform: translateY(-30px);
            opacity: 0;
        }
    }
    
    input[type="range"] {
    -webkit-appearance: none;
    background-color: #fff;
    }
    input[type="range"]:focus {
    outline: none;
    }
</style>
