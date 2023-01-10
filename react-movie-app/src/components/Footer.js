import style from './Footer.module.css';

function Footer() {
  return (
    <footer className={style.footer}>
      <div className={style.footer__container}>
        <span>&copy; Copyright #{new Date().getFullYear()} Jaehee Chung</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
