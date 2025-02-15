import FloatingPointTabs from '@/components/FloatingPointTabs.vue';
import PolyadicNumbers from '@/components/PolyadicNumbers.vue';
import BooleanFunctionMinimizer from '@/components/BooleanFunctionMinimizer.vue';
import KVDiagram from '@/components/KVDiagram.vue';
import DescriptionPDF from '@/components/DescriptionPDF.vue';
import Cmos from '@/components/Cmos.vue';
import Home from '../views/Home.vue';
import Contact from '../views/Contact.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
  },
  {
    path: '/fparithmetic',
    name: 'FloatingPointTabs',
    component: FloatingPointTabs,
  },
  {
    path: '/polyadic',
    name: 'PolyadicNumbers',
    component: PolyadicNumbers,
  },
  {
    path: '/kvdiagram',
    name: 'KVDiagram',
    component: KVDiagram,
  },
  {
    path: '/bfminimizer',
    name: 'BooleanFunctionMinimizer',
    component: BooleanFunctionMinimizer,
  },
  {
    path: '/descriptionpdf',
    name: 'DescriptionPDF',
    component: DescriptionPDF,
  },
  {
    path: '/cmos',
    name: 'Cmos',
    component: Cmos,
  },
];

export default routes;
