
        <label for="especie_id">Especies: </label>
        <select name="especie_id">
            <?php while ($especie = mysqli_fetch_array($consulta)) { ?>
                <option value="<?php echo $especie['id']; ?>"><?php echo $especie['nombre']; ?> </option>
            <?php  } ?>
        </select>
        <br><br>