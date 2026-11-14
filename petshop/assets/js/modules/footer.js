
const Footer = (() => {
  const renderizar = () => {
    const f = document.getElementById('footer');
    if (!f) return;

    f.innerHTML = `
      <div class="container">
        <div class="footer__grid">
          <div class="footer__col">
            <h3><i class="fas fa-paw" aria-hidden="true"></i> PetAmigo</h3>
            <p style="color: rgba(255,255,255,0.85); font-size: 0.9rem;">Cuidando do seu melhor amigo com amor e profissionalismo desde 2015.</p>
            <div class="footer__redes">
              <a href="#" aria-label="Facebook"><i class="fab fa-facebook" aria-hidden="true"></i></a>
              <a href="#" aria-label="Instagram"><i class="fab fa-instagram" aria-hidden="true"></i></a>
              <a href="#" aria-label="Twitter"><i class="fab fa-twitter" aria-hidden="true"></i></a>
            </div>
          </div>
          <div class="footer__col">
            <h3>Navegação</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#sobre">Sobre nós</a></li>
              <li><a href="#servicos">Serviços</a></li>
              <li><a href="#produtos">Produtos</a></li>
              <li><a href="#adocao">Adoção</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h3>Institucional</h3>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#termos">Termos de uso</a></li>
              <li><a href="#privacidade">Política de privacidade</a></li>
              <li><a href="#contato">Contato</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h3>Contato</h3>
            <ul>
              <li><i class="fas fa-map-marker-alt" aria-hidden="true"></i> Rua dos Pets, 123 - São Paulo/SP</li>
              <li><i class="fas fa-phone" aria-hidden="true"></i> (11) 9999-9999</li>
              <li><i class="fas fa-envelope" aria-hidden="true"></i> contato@petamigo.com.br</li>
              <li><i class="fas fa-clock" aria-hidden="true"></i> Seg-Sáb: 8h às 20h</li>
            </ul>
          </div>
        </div>
        <div class="footer__base">
          <p>&copy; ${new Date().getFullYear()} PetAmigo. Todos os direitos reservados.</p>
        </div>
      </div>`;
  };

  return { renderizar };
})();