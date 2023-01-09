import style from './Footer.module.css';

function Footer() {
  return (
    <footer className={style.footer}>
      <span>&copy; Copyright #{new Date().getFullYear()} Jaehee Chung</span>
      <span>All rights reserved.</span>
    </footer>
  );
}

export default Footer;
