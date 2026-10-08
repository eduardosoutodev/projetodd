package br.com.gerenciadordd.service;

import br.com.gerenciadordd.model.Personagem;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/*
 * Testes da AtributoService.
 * Essa classe foi escolhida por conter apenas os cálculos de D&D 5e,
 * sem depender de banco de dados ou interface gráfica, o que facilita
 * os testes.
 */
 
public class AtributoServiceTest {

    private final AtributoService service = new AtributoService();

    //  calcularModificador 

    @Test
    public void modificadorDeAtributoDezDeveSerZero() {
        assertEquals(0, service.calcularModificador(10));
    }

    @Test
    public void modificadorDeAtributoVinteDeveSerMaisCinco() {
        assertEquals(5, service.calcularModificador(20));
    }

    @Test
    public void modificadorDeAtributoOitoDeveSerMenosUm() {
        assertEquals(-1, service.calcularModificador(8));
    }

    @Test
    public void modificadorDeAtributoUmDeveSerMenosCinco() {
        assertEquals(-5, service.calcularModificador(1));
    }

    // ---------- calcularBonusProficiencia ----------

    @Test
    public void bonusProficienciaNivelUmDeveSerMaisDois() {
        assertEquals(2, service.calcularBonusProficiencia(1));
    }

    @Test
    public void bonusProficienciaNivelQuatroDeveSerMaisDois() {
        // regra: o bônus só sobe a cada 4 níveis
        assertEquals(2, service.calcularBonusProficiencia(4));
    }

    @Test
    public void bonusProficienciaNivelCincoDeveSerMaisTres() {
        assertEquals(3, service.calcularBonusProficiencia(5));
    }

    @Test
    public void bonusProficienciaNivelDezesseteDeveSerMaisSeis() {
        assertEquals(6, service.calcularBonusProficiencia(17));
    }

    //  calcularBonusAtaque 

    @Test
    public void bonusAtaqueDeveSomarModificadorDeForcaComProficiencia() {
        Personagem p = new Personagem();
        p.setForca(16);  // modificador +3
        p.setNivel(5);   // proficiência +3
        assertEquals(6, service.calcularBonusAtaque(p));
    }

    //  calcularBonusPericia 

    @Test
    public void bonusPericiaDestrezaDeveSomarModificadorComProficiencia() {
        Personagem p = new Personagem();
        p.setDestreza(14); // modificador +2
        p.setNivel(1);     // proficiência +2
        assertEquals(4, service.calcularBonusPericia(p, "destreza"));
    }

    @Test
    public void bonusPericiaComAtributoInvalidoDeveUsarSoAProficiencia() {
        Personagem p = new Personagem();
        p.setNivel(1); // proficiência +2, modificador inválido conta como 0
        assertEquals(2, service.calcularBonusPericia(p, "atributo-que-nao-existe"));
    }

    //  formatarModificador 

    @Test
    public void formatarModificadorPositivoDeveTerSinalDeMais() {
        assertEquals("+3", service.formatarModificador(3));
    }

    @Test
    public void formatarModificadorZeroDeveTerSinalDeMais() {
        assertEquals("+0", service.formatarModificador(0));
    }

    @Test
    public void formatarModificadorNegativoNaoDeveTerSinalDeMais() {
        assertEquals("-2", service.formatarModificador(-2));
    }
}
