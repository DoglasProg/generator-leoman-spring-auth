package <%= packageName %>.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import entity.Parking;
import service.ParkingService;

@RestController
public class ParkingController {

    @Autowired
    ParkingService parkingService;

    @RequestMapping(value = "/parking/{id}", method = RequestMethod.GET)
    public Parking getById(@PathVariable String id) {
        return this.parkingService.getById(id);
    }

    @RequestMapping(value = "/parking", method = RequestMethod.POST)
    public Parking salvar(@RequestBody Parking parking) {
        return this.parkingService.save(parking);
    }

//    @RequestMapping(value = "/parking", method = RequestMethod.PUT)
//    public UserParking editar(@RequestBody UserParking user) {
//        return this.parkingService.saveUser(user);
//    }

    @RequestMapping(value = "/parking/{id}", method = RequestMethod.DELETE)
    public void deletar(@PathVariable String id) {
        this.parkingService.delete(id);
    }
    
//    @RequestMapping(value = "/diario/{idAluno}/aluno", method = RequestMethod.GET)
//    public List<Diario> findByAluno(@PathVariable String idAluno) {
//        Aluno aluno = alunoRepository.findOne(idAluno);
//
//        return repository.findByAluno(aluno);
//    }
//
//    @RequestMapping(value = "/diario/{idModulo}/modulo", method = RequestMethod.GET)
//    public List<Diario> findByModulo(@PathVariable String idModulo) {
//        Modulo modulo = moduloRepository.findOne(idModulo);
//
//        return repository.findByModulo(modulo);
//    }
//
//    @RequestMapping(value = "/diario/{de}/{ate}", method = RequestMethod.GET)
//    public List<Diario> list(@PathVariable String de, @PathVariable String ate) throws ParseException {
//        SimpleDateFormat formato = new SimpleDateFormat("yyyy-MM-dd");
//        Date dataDe = formato.parse(de);
//        Date dataAte = formato.parse(ate);
//
//        return repository.findByDataBetween(dataDe, dataAte);
//    }

}
