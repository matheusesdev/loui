import { mount } from 'svelte';
import LabPreview from './components/LabPreview.svelte';
import './styles/preview.css';
mount(LabPreview,{target:document.querySelector('#preview-app')});
