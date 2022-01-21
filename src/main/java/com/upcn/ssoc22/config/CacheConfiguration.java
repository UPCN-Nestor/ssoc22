package com.upcn.ssoc22.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.upcn.ssoc22.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.upcn.ssoc22.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.upcn.ssoc22.domain.User.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Authority.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.User.class.getName() + ".authorities");
            createCache(cm, com.upcn.ssoc22.domain.Cliente.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Cliente.class.getName() + ".padrons");
            createCache(cm, com.upcn.ssoc22.domain.Cliente.class.getName() + ".adhesions");
            createCache(cm, com.upcn.ssoc22.domain.Cliente.class.getName() + ".contratoes");
            createCache(cm, com.upcn.ssoc22.domain.Cliente.class.getName() + ".facturas");
            createCache(cm, com.upcn.ssoc22.domain.Cliente.class.getName() + ".itemFacturas");
            createCache(cm, com.upcn.ssoc22.domain.Individuo.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Individuo.class.getName() + ".adhesions");
            createCache(cm, com.upcn.ssoc22.domain.Individuo.class.getName() + ".solicitudPrestacions");
            createCache(cm, com.upcn.ssoc22.domain.Tarifa.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Adhesion.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Contrato.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Plan.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Plan.class.getName() + ".provisions");
            createCache(cm, com.upcn.ssoc22.domain.Plan.class.getName() + ".tarifas");
            createCache(cm, com.upcn.ssoc22.domain.Plan.class.getName() + ".contratoes");
            createCache(cm, com.upcn.ssoc22.domain.ItemFactura.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Factura.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Factura.class.getName() + ".itemFacturas");
            createCache(cm, com.upcn.ssoc22.domain.Provision.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Provision.class.getName() + ".reglaPrestacions");
            createCache(cm, com.upcn.ssoc22.domain.Provision.class.getName() + ".itemNomencladors");
            createCache(cm, com.upcn.ssoc22.domain.Provision.class.getName() + ".insumos");
            createCache(cm, com.upcn.ssoc22.domain.ReglaPrestacion.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Prestacion.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Prestacion.class.getName() + ".itemNomencladors");
            createCache(cm, com.upcn.ssoc22.domain.Prestacion.class.getName() + ".insumos");
            createCache(cm, com.upcn.ssoc22.domain.Insumo.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Insumo.class.getName() + ".movimientoStocks");
            createCache(cm, com.upcn.ssoc22.domain.Insumo.class.getName() + ".prestacions");
            createCache(cm, com.upcn.ssoc22.domain.Insumo.class.getName() + ".solicitudPrestacions");
            createCache(cm, com.upcn.ssoc22.domain.Insumo.class.getName() + ".provisions");
            createCache(cm, com.upcn.ssoc22.domain.MovimientoStock.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Despacho.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Chofer.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Chofer.class.getName() + ".despachos");
            createCache(cm, com.upcn.ssoc22.domain.Medico.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Medico.class.getName() + ".despachos");
            createCache(cm, com.upcn.ssoc22.domain.Enfermero.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Enfermero.class.getName() + ".despachos");
            createCache(cm, com.upcn.ssoc22.domain.Movil.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Movil.class.getName() + ".despachos");
            createCache(cm, com.upcn.ssoc22.domain.SolicitudPrestacion.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.SolicitudPrestacion.class.getName() + ".insumos");
            createCache(cm, com.upcn.ssoc22.domain.ItemNomenclador.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.ItemNomenclador.class.getName() + ".solicitudPrestacions");
            createCache(cm, com.upcn.ssoc22.domain.ItemNomenclador.class.getName() + ".prestadors");
            createCache(cm, com.upcn.ssoc22.domain.Prestador.class.getName());
            createCache(cm, com.upcn.ssoc22.domain.Prestador.class.getName() + ".itemNomencladors");
            createCache(cm, com.upcn.ssoc22.domain.Prestador.class.getName() + ".despachos");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
